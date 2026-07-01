import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/emailService';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { generateAdminEmailHtml, generateCustomerEmailHtml, generateRegistrationEmailTemplate } from '@/lib/emailTemplates';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import Order from '@/backend/models/Order';
import Product from '@/backend/models/Product';
import Coupon from '@/backend/models/Coupon';
import Register from '@/backend/models/Register';
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
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rl = rateLimit(ip, 20, 3600000); // 20 per hour
    if (!rl.success) {
      return NextResponse.json({ success: false, error: 'Too many checkout attempts. Please try again later.' }, { status: 429 });
    }

    await connectDB();
    const body = await request.json();
    console.log('--- Checkout API Started ---');
    console.log('Request Body:', JSON.stringify(body, null, 2));
    const { orderDetails, customerEmail, adminEmail, customerInfo, couponCode, discountAmount, appliedCashBalance, turnstileToken } = body;

    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return NextResponse.json({ success: false, error: 'Security check failed. Please refresh the page.' }, { status: 400 });
    }

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

      // Also add to Register table as requested
      try {
        await Register.create({
          name: `${customerInfo?.firstName || 'Customer'} ${customerInfo?.lastName || ''}`.trim(),
          email: customerEmail.toLowerCase(),
          phone: customerInfo?.phone || '',
        });
      } catch (regErr) {
        console.error('Error inserting into Register table:', regErr);
      }
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

    // 3. Send Emails in Background (Fire-and-forget to speed up checkout response time)
    console.log('--- Starting Email Process (Background) ---');
    
    const sendEmailsAsync = async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      const adminEmailHtml = generateAdminEmailHtml(orderDetails, customerEmail);
      try {
        await sendEmail({
          from: `"FunGuyz Admin" <hello@funguyzdelivery.ca>`,
          to: adminEmail || process.env.MS_SENDER_EMAIL || process.env.SMTP_USER || 'hello@funguyzdelivery.ca',
          subject: `New Order Received - ${orderDetails.orderId}`,
          html: adminEmailHtml
        });
        await delay(600); // Wait 600ms to avoid rate limit
      } catch (e) {
        console.error('Admin email failed:', e);
      }

      if (customerEmail) {
        let customerEmailHtml = generateCustomerEmailHtml(orderDetails, customerEmail);
        if (isNewUser) {
          const fullName = `${customerInfo?.firstName || 'Customer'} ${customerInfo?.lastName || ''}`.trim();
          const regEmailContent = generateRegistrationEmailTemplate(fullName, generatedPassword);
          try {
            await sendEmail({
              from: `"The Delivery & Shipping Team" <hello@funguyzdelivery.ca>`,
              replyTo: `hello@funguyzdelivery.ca`,
              to: customerEmail.toLowerCase(),
              subject: "You're officially on the list 🍄",
              html: regEmailContent.html,
            });
            await delay(600); // Wait 600ms
          } catch (e) {
            console.error('Registration email failed:', e);
          }
        }
        
        try {
          await sendEmail({
            from: `"FunGuyz Store" <hello@funguyzdelivery.ca>`,
            replyTo: `hello@funguyzdelivery.ca`,
            to: customerEmail,
            subject: `Order Confirmation - ${orderDetails.orderId}`,
            html: customerEmailHtml
          });
        } catch (e) {
          console.error('Customer email failed:', e);
        }
      }
    };

    // Do NOT await this function. Let it run in the background.
    sendEmailsAsync().catch(console.error);

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
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? (error.message || 'Failed to process checkout') : 'An unexpected error occurred' }, { status: 500 });
  }
}

