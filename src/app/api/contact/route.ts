import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { generateContactEmailTemplate } from '@/lib/emailTemplates';
import connectDB from '@/backend/config/db';
import { SupportTicket } from '@/backend/models/SupportTicket';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Connect to database and save the ticket
    await connectDB();
    const newTicket = await SupportTicket.create({
      name,
      email,
      phone,
      category,
      subject,
      message,
      status: 'Open'
    });

    // Generate the beautifully formatted email template
    const emailContent = generateContactEmailTemplate(body);

    // Send the email securely to the admin inbox via the centralized service
    await sendEmail({
      from: `"FunGuyz Store" <${process.env.SMTP_USER || 'no-reply@funguyz.ca'}>`,
      to: process.env.SMTP_USER || 'hello@funguyz.ca',
      subject: `[Support Ticket] ${category} - ${subject || 'New Inquiry'}`,
      html: emailContent.html,
      replyTo: email, // This allows the admin to hit "Reply" and email the customer directly
    });

    console.log(`✅ Support ticket email sent successfully from ${email}`);

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to process contact form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request', details: error.message },
      { status: 500 }
    );
  }
}
