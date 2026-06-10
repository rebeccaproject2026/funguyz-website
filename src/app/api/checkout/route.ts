import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';
import { generateAdminEmailHtml, generateCustomerEmailHtml } from '@/lib/emailTemplates';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import Order from '@/backend/models/Order';
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
    const { orderDetails, customerEmail, adminEmail, customerInfo, couponCode, discountAmount, appliedCashBalance } = body;

    // 1. Check if user exists, if not create them
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

    // 2. Create the Order
    const subTotal = parseFloat(orderDetails.subtotal.replace(/[^0-9.-]+/g,""));
    const grandTotal = parseFloat(orderDetails.grandTotal.replace(/[^0-9.-]+/g,""));
    const shippingAmount = 20; // Default flat rate from frontend
    
    // Convert items
    const items = orderDetails.items.map((item: any) => ({
       title: item.title,
       imageSrc: item.imageSrc,
       priceAtPurchase: parseFloat(item.price.replace(/[^0-9.-]+/g,"")),
       quantity: item.quantity,
    }));

    const newOrder = await Order.create({
      customer: user._id,
      guestEmail: customerEmail,
      orderNumber: orderDetails.orderId,
      trackingNumber: orderDetails.trackingCode,
      status: EOrderStatus.PENDING,
      orderItems: items,
      subTotal,
      totalAmount: grandTotal,
      taxAmount: 0,
      shippingAmount,
      discountAmount,
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

    // 3. Send Emails Concurrently to speed up checkout
    const emailPromises = [];

    const adminMailOptions = {
      from: `"FunGuyz Store" <${process.env.TITAN_EMAIL_USER || 'no-reply@funguyz.ca'}>`,
      to: adminEmail || process.env.TITAN_EMAIL_USER,
      subject: `New Order Received - ${orderDetails.orderId}`,
      html: generateAdminEmailHtml(orderDetails, customerEmail),
    };
    emailPromises.push(transporter.sendMail(adminMailOptions).catch(e => console.error('Admin email failed', e)));

    if (customerEmail) {
      const customerMailOptions = {
        from: `"FunGuyz Store" <${process.env.TITAN_EMAIL_USER || 'no-reply@funguyz.ca'}>`,
        to: customerEmail,
        subject: `Order Confirmation - ${orderDetails.orderId}`,
        html: generateCustomerEmailHtml(orderDetails, customerEmail) 
              + (isNewUser ? `<br><p>An account was created for you! Temp Password: <b>${generatedPassword}</b></p>` : ''),
      };
      emailPromises.push(transporter.sendMail(customerMailOptions).catch(e => console.error('Customer email failed', e)));
    }

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ 
      success: true, 
      message: 'Checkout complete',
      isNewUser,
      password: generatedPassword
    });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process checkout' }, { status: 500 });
  }
}
