import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import { transporter } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });

    await connectDB();
    const user = await Customer.findOne({ email: email.toLowerCase(), deleted: false });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return NextResponse.json({ success: true, message: 'If an account exists, an email has been sent.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save hashed token and expiry (1 hour)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.funguyz.ca'}/reset-password?token=${resetToken}`;

    // Send email
    const mailOptions = {
      from: `"FunGuyz Store" <${process.env.TITAN_EMAIL_USER || 'no-reply@funguyz.ca'}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ff4fa3;">Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below to choose a new one:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #ff4fa3; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Reset Password</a>
          <p>If you did not request this, please ignore this email. This link will expire in 1 hour.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'If an account exists, an email has been sent.' });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
