import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';

function generateRandomPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pass = 'FG-';
  for (let i = 0; i < 6; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
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

    return NextResponse.json({ 
      success: true, 
      message: 'Temporary password generated successfully.',
      newPassword: tempPassword 
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
