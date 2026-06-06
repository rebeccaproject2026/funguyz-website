import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';
import { generateAdminEmailHtml, generateCustomerEmailHtml } from '@/lib/emailTemplates';
// import dotenv from 'dotenv';


export async function POST(request: Request) {
  try {
    const { orderDetails, customerEmail, adminEmail } = await request.json();

    // 1. Send Admin Notification
    const adminMailOptions = {
      from: `"FunGuyz Store" <${process.env.TITAN_EMAIL_USER}>`,
      to: adminEmail || process.env.TITAN_EMAIL_USER,
      subject: `New Order Received - ${orderDetails.orderId}`,
      html: generateAdminEmailHtml(orderDetails, customerEmail),
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Send Customer Confirmation
    if (customerEmail) {
      const customerMailOptions = {
        from: `"FunGuyz Store" <${process.env.TITAN_EMAIL_USER}>`,
        to: customerEmail,
        subject: `Order Confirmation - ${orderDetails.orderId}`,
        html: generateCustomerEmailHtml(orderDetails, customerEmail),
      };
      await transporter.sendMail(customerMailOptions);
    }

    return NextResponse.json({ success: true, message: 'Checkout emails sent successfully' });
  } catch (error: any) {
    console.error('Checkout Email Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send emails' }, { status: 500 });
  }
}
