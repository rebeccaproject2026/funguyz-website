import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import crypto from 'crypto';
import { verifyTurnstileToken } from '@/lib/turnstile';
import bcrypt from 'bcryptjs';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import { sendEmail } from '@/lib/emailService';

function generateRandomPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pass = 'FG-';
  for (let i = 0; i < 6; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rl = rateLimit(ip, 3, 300000); // 3 per 5 minutes
    if (!rl.success) {
      return NextResponse.json({ success: false, message: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { email, turnstileToken } = await request.json();
    
    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return NextResponse.json({ success: false, message: 'Security check failed. Please refresh the page.' }, { status: 400 });
    }

    if (!email) return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });

    await connectDB();
    const user = await Customer.findOne({ email: email.toLowerCase(), deleted: false });

    if (!user) {
      return NextResponse.json({ success: true, message: 'If an account exists, a temporary password has been generated.' });
    }

    // Generate FG-XXXXXX temporary password
    const tempPassword = generateRandomPassword();
    
    // Hash it and overwrite the user's password
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    user.passwordHash = passwordHash;
    user.isDummyPassword = true;
    
    // Also update these legacy fields just in case they are referenced anywhere else
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    user.tempPasswordToken = tempPassword;
    user.tempPasswordExpiresAt = expiryDate;

    await user.save();

    // Send email with the temporary password
    try {
      await sendEmail({
        to: email,
        subject: 'Your Temporary Password - FunGuyz',
        html: `<p>You requested a password reset. Your temporary password is: <strong>${tempPassword}</strong></p><p>Please log in and change your password immediately.</p>`
      });
    } catch (emailError) {
      console.error('Failed to send forgot password email:', emailError);
      // We still return success so we don't leak if the email exists or not, but ideally email sending shouldn't fail.
    }

    return NextResponse.json({ 
      success: true, 
      message: 'If an account exists, a temporary password has been sent to the email.'
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
