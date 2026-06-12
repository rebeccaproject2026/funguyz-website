import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Announcement from '@/backend/models/Announcement';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const announcements = await Announcement.find({ isActive: true });
    return NextResponse.json({ success: true, announcements });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

