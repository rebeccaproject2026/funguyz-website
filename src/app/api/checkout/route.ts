import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';
import { generateAdminEmailHtml, generateCustomerEmailHtml } from '@/lib/emailTemplates';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import Order from '@/backend/models/Order';
import Product from '@/backend/models/Product';
import Coupon from '@/backend/models/Coupon';
import { EProductStatus } from '@/backend/models/interfaces/IProduct';
import { ERole } from '@/backend/models/interfaces/ICustomer';
import { EOrderStatus } from '@/backend/models/interfaces/IOrder';
import bcrypt from 'bcryptjs';

function generateRandomPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pass = 'FG-';
  for (let i = 0; i < 6; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log('--- Checkout API Started ---');
    console.log('Request Body:', JSON.stringify(body, null, 2));
    const { orderDetails, customerEmail, adminEmail, customerInfo, couponCode, discountAmount, appliedCashBalance } = body;

    // 1. Check if user exists, if not create them
    console.log(`Checking user existence for email: ${customerEmail}`);
    let user = await Customer.findOne({ email: customerEmail.toLowerCase() });
    let isNewUser = false;
    let generatedPassword = '';

    if (!user) {
      isNewUser = true;
      generatedPassword = generateRandomPassword();
      const passwordHash = await bcrypt.hash(generatedPassword, 10);

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry

      user = await Customer.create({
        firstName: customerInfo?.firstName || 'Customer',
        lastName: customerInfo?.lastName || '',
        email: customerEmail.toLowerCase(),
        phone: customerInfo?.phone || '',
        passwordHash,
        tempPasswordToken: generatedPassword,
        tempPasswordExpiresAt: expiryDate,
        role: ERole.CUSTOMER,
        addresses: [{
          street: customerInfo?.address || '',
          city: customerInfo?.city || '',
          province: customerInfo?.province || 'ON',
          postalCode: customerInfo?.postcode || '',
          isDefault: true
        }]
      });
    } else if (customerInfo) {
      // Returning user or logged-in user: update phone if missing, deduct cash if applied
      let needsSave = false;
      if (!user.phone && customerInfo.phone) {
        user.phone = customerInfo.phone;
        needsSave = true;
      }
      if (appliedCashBalance && appliedCashBalance > 0 && user.cashBalance >= appliedCashBalance) {
        user.cashBalance -= appliedCashBalance;
        needsSave = true;
      }
      if (needsSave) {
        await user.save();
      }
    }

    // 2. Recalculate and Create the Order
    console.log('User check complete. User ID:', user?._id);
    const clientSubTotal = parseFloat(orderDetails.subtotal.replace(/[^0-9.-]+/g, ""));
    const clientGrandTotal = parseFloat(orderDetails.grandTotal.replace(/[^0-9.-]+/g, ""));

    let trueSubTotal = 0;
    const trueItems = [];

    for (const item of orderDetails.items) {
      if (!item.title) continue;

      let product = null;

      const queryId = item.productId || item.id;
      if (queryId && /^[0-9a-fA-F]{24}$/.test(queryId)) {
        product = await Product.findById(queryId).lean() as any;
      }

      let productName = item.title.trim();
      let weight = null;

      const weightMatch = productName.match(/^(.*?)\s*\(([^)]+)\)$/);
      if (weightMatch) {
        productName = weightMatch[1].trim();
        weight = weightMatch[2].trim();
      }

      if (productName.toLowerCase().endsWith(' magic mushrooms')) {
        productName = productName.substring(0, productName.length - 16).trim();
      }

      if (!product) {
        product = await Product.findOne({
          name: new RegExp(`^${productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
          status: { $ne: EProductStatus.OUT_OF_STOCK }
        }).lean() as any;
      }

      let truePrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Fallback
      if (product) {
        truePrice = product.price;
        if (weight && product.pricing && product.pricing.length > 0) {
          const pricingOption = product.pricing.find((p: any) => p.weight.toLowerCase() === weight.toLowerCase());
          if (pricingOption && pricingOption.price != null) {
            truePrice = pricingOption.price;
          }
        }
      } else if (!item.title.toLowerCase().includes('bundle')) {
        console.error(`Checkout Error: Product not found or unavailable: ${item.title}`);
        return NextResponse.json({ success: false, error: `Product not found or unavailable: ${item.title}` }, { status: 400 });
      }

      trueSubTotal += truePrice * item.quantity;
      trueItems.push({
        title: item.title,
        imageSrc: product?.heroImage || item.imageSrc,
        priceAtPurchase: truePrice,
        quantity: item.quantity,
      });
    }

    console.log(`Product validation complete. trueSubTotal: ${trueSubTotal}`);

    // Recalculate Coupon and Shipping
    let trueDiscountAmount = 0;
    let trueShippingAmount = 20; // Default flat rate

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon) {
        if (coupon.discountLabel && (coupon.title.toLowerCase().includes('free shipping') || coupon.title.toLowerCase().includes('free delivery'))) {
          trueShippingAmount = 0;
        } else if (coupon.discount.includes('%')) {
          const percent = parseInt(coupon.discount) / 100;
          trueDiscountAmount = trueSubTotal * percent;
        }
      }
    }

    let trueGrandTotal = trueSubTotal + trueShippingAmount - trueDiscountAmount;

    // Apply cash balance to server total just like the frontend does
    if (appliedCashBalance && appliedCashBalance > 0) {
      const validCash = user ? user.cashBalance : 0;
      const amountToApply = Math.min(validCash, appliedCashBalance, trueGrandTotal);
      trueGrandTotal = Math.max(0, trueGrandTotal - amountToApply);
    }

    // Validate (Allow tiny floating point variance)
    console.log(`Validating totals. trueGrandTotal: ${trueGrandTotal}, clientGrandTotal: ${clientGrandTotal}`);
    if (Math.abs(trueGrandTotal - clientGrandTotal) > 0.05) {
      console.error(`Price Mismatch! Client: ${clientGrandTotal}, Server: ${trueGrandTotal}`);
      return NextResponse.json({ success: false, error: 'Price validation failed. Your cart prices were out of sync. Please refresh the page.' }, { status: 400 });
    }

    console.log('Creating new order in DB...');
    const newOrder = await Order.create({
      customer: user._id,
      guestEmail: customerEmail,
      orderNumber: orderDetails.orderId,
      trackingNumber: orderDetails.trackingCode,
      status: EOrderStatus.PENDING,
      orderItems: trueItems,
      subTotal: trueSubTotal,
      totalAmount: trueGrandTotal,
      taxAmount: 0,
      shippingAmount: trueShippingAmount,
      discountAmount: trueDiscountAmount,
      couponCode,
      shippingAddress: {
        street: customerInfo?.address || '',
        city: customerInfo?.city || '',
        province: customerInfo?.province || 'ON',
        postalCode: customerInfo?.postcode || '',
      },
      deliveryDetails: {
        date: orderDetails.deliveryDetails?.date,
        timeSlot: orderDetails.deliveryDetails?.timeSlot,
      }
    });

    console.log(`Order created successfully. Order ID: ${newOrder._id}`);

    // 3. Send Emails Concurrently to speed up checkout
    // --- COMMENTED OUT NODEMAILER (BLOCKED BY DIGITALOCEAN) ---
    /*
    const emailPromises = [];

    const adminMailOptions = {
      from: `"FunGuyz Store" <${process.env.SMTP_USER || 'no-reply@funguyz.ca'}>`,
      to: adminEmail || process.env.SMTP_USER,
      subject: `New Order Received - ${orderDetails.orderId}`,
      html: generateAdminEmailHtml(orderDetails, customerEmail),
    };
    emailPromises.push(transporter.sendMail(adminMailOptions).catch(e => console.error('Admin email failed', e)));

    if (customerEmail) {
      const customerMailOptions = {
        from: `"FunGuyz Store" <${process.env.SMTP_USER || 'no-reply@funguyz.ca'}>`,
        to: customerEmail,
        subject: `Order Confirmation - ${orderDetails.orderId}`,
        html: generateCustomerEmailHtml(orderDetails, customerEmail)
          + (isNewUser ? `<br><p>An account was created for you! Temp Password: <b>${generatedPassword}</b></p>` : ''),
      };
      emailPromises.push(transporter.sendMail(customerMailOptions).catch(e => console.error('Customer email failed', e)));
    }

    await Promise.allSettled(emailPromises);
    */

    // --- NEW: Microsoft Graph API Implementation (Port 443 - Bypasses Block) ---
    console.log('--- Starting Microsoft Graph API Email Process ---');
    const emailPromises = [];
    const tenantId = process.env.MS_TENANT_ID;
    const clientId = process.env.MS_CLIENT_ID;
    const clientSecret = process.env.MS_CLIENT_SECRET;
    const senderEmail = process.env.MS_SENDER_EMAIL || 'hello@funguyz.ca';

    console.log(`Graph API Credentials Check: TenantId=${!!tenantId}, ClientId=${!!clientId}, ClientSecret=${!!clientSecret}, Sender=${senderEmail}`);

    if (tenantId && clientId && clientSecret) {
      try {
        // 1. Get OAuth Token
        console.log('Requesting OAuth token from Microsoft...');
        const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: clientId,
            scope: 'https://graph.microsoft.com/.default',
            client_secret: clientSecret,
            grant_type: 'client_credentials'
          })
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.access_token) {
          console.log('Successfully acquired OAuth token!');
          const sendGraphEmail = async (toEmail: string, subject: string, htmlContent: string) => {
            console.log(`Sending email to ${toEmail}...`);
            return fetch(`https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: {
                  subject: subject,
                  body: {
                    contentType: 'HTML',
                    content: htmlContent
                  },
                  toRecipients: [
                    { emailAddress: { address: toEmail } }
                  ]
                },
                saveToSentItems: true
              })
            }).then(async res => {
              if (res.ok) {
                 console.log(`Email successfully delivered to ${toEmail}!`);
              } else {
                 const err = await res.text();
                 console.error(`Graph API Error sending to ${toEmail}:`, res.status, err);
              }
            });
          };

          emailPromises.push(sendGraphEmail(
            adminEmail || senderEmail,
            `New Order Received - ${orderDetails.orderId}`,
            generateAdminEmailHtml(orderDetails, customerEmail)
          ).catch(e => console.error('Graph API Admin email failed Exception:', e)));

          if (customerEmail) {
            emailPromises.push(sendGraphEmail(
              customerEmail,
              `Order Confirmation - ${orderDetails.orderId}`,
              generateCustomerEmailHtml(orderDetails, customerEmail) + (isNewUser ? `<br><p>An account was created for you! Temp Password: <b>${generatedPassword}</b></p>` : '')
            ).catch(e => console.error('Graph API Customer email failed Exception:', e)));
          }
        } else {
           console.error('Failed to get Microsoft Graph API token. Response:', JSON.stringify(tokenData));
        }
      } catch (err) {
        console.error('Exception Error connecting to Microsoft Graph API:', err);
      }
    } else {
       console.log('Microsoft 365 credentials missing. Skipping emails completely.');
    }

    await Promise.allSettled(emailPromises);

    return NextResponse.json({
      success: true,
      message: 'Checkout complete',
      isNewUser,
      password: generatedPassword
    });

  } catch (error: any) {
    console.error('--- Checkout API Exception ---');
    console.error('Error Details:', error);
    console.error('Stack Trace:', error.stack);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process checkout' }, { status: 500 });
  }
}
