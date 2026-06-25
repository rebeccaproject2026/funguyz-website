import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import connectDB from '@/backend/config/db';
import { verifyTurnstileToken } from '@/lib/turnstile';
import Register from '@/backend/models/Register';
import { sendEmail } from '@/lib/emailService';
import { generateRegistrationEmailTemplate } from '@/lib/emailTemplates';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rl = rateLimit(ip, 5, 3600000); // 5 per hour
    if (!rl.success) {
      return NextResponse.json({ success: false, message: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    await connectDB();

    const body = await req.json();
    const { name, email, phone, turnstileToken } = body;

    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return NextResponse.json({ success: false, message: 'Security check failed. Please refresh the page.' }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || typeof email !== 'string' || (phone && typeof phone !== 'string')) {
      return NextResponse.json(
        { success: false, message: 'Invalid input format' },
        { status: 400 }
      );
    }

    const existingRegistration = await Register.findOne({ email: email.toLowerCase() });
    
    if (existingRegistration) {
      return NextResponse.json({ success: true, message: 'Already registered' }, { status: 200 });
    }

    const registration = await Register.create({
      name,
      email: email.toLowerCase(),
      phone: phone || undefined,
    });

    // Send the confirmation email
    try {
      const emailContent = generateRegistrationEmailTemplate(name);
      await sendEmail({
        from: `"The Delivery & Shipping Team" <${process.env.SMTP_USER || 'no-reply@funguyz.ca'}>`,
        to: email.toLowerCase(),
        subject: "You're officially on the list 🍄",
        html: emailContent.html,
      });
      console.log(`✅ Registration email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send registration email:', emailError);
      // We don't fail the whole registration if just the email fails
    }

    return NextResponse.json({ success: true, data: registration }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}

