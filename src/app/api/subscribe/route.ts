import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Subscriber from '@/backend/models/Subscriber';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        // If they unsubscribed before, resubscribe them
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        return NextResponse.json({ success: true, message: 'Welcome back! You have been re-subscribed.' });
      }
      return NextResponse.json({ success: true, message: 'You are already subscribed!' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!'
    });

  } catch (error: any) {
    console.error('Subscribe API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
  }
}
