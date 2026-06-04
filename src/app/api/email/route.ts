import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { to, subject, text, html } = data;

    // This transport will be updated once Frank provides the Google Workspace credentials.
    // Ensure to store actual credentials in .env file (e.g., process.env.EMAIL_USER)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Assuming Workspace uses Gmail SMTP
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'placeholder@funguyz.ca', 
        pass: process.env.EMAIL_PASS || 'placeholder_password', 
      },
    });

    const info = await transporter.sendMail({
      from: `"FunGuyz Support" <${process.env.EMAIL_USER || 'support@funguyz.ca'}>`,
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
