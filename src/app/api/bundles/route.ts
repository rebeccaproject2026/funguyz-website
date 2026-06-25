import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import { Bundle } from '@/backend/models/Bundle';

export async function GET() {
  try {
    await connectDB();
    const bundles = await Bundle.find({}).lean();
    return NextResponse.json({ success: true, bundles });
  } catch (error: any) {
    console.error('Fetch bundles error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

