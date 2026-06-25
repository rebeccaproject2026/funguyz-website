import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Coupon from '@/backend/models/Coupon';

export async function GET() {
  try {
    await connectDB();

    const coupons = await Coupon.find({ isActive: true }).lean();

    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

