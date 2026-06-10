import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ exists: false, error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const user = await Customer.findOne({ email: email.toLowerCase(), deleted: false });

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    // Return safe user data for checkout auto-fill
    // Do NOT return passwordHash or tokens
    return NextResponse.json({
      exists: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        cashBalance: user.cashBalance || 0,
        address: user.addresses?.length > 0 ? user.addresses[0] : null,
      }
    });

  } catch (error: any) {
    console.error('Lookup API Error:', error);
    return NextResponse.json({ exists: false, error: 'Server error during lookup' }, { status: 500 });
  }
}
