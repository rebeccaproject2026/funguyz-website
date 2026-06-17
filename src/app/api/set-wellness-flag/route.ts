import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import BlogPost from '@/backend/models/BlogPost';

export async function GET() {
  try {
    await connectDB();
    
    const slugs = [
      'integrating-psychedelics-insights-home',
      'mindset-and-intention-blueprint',
      'adrenal-recovery-combating-burnout',
      'microdosing-morning-coffee-alternative'
    ];
    
    // Use strict: false to force the update even if Next.js has cached the old Mongoose schema
    await BlogPost.updateMany(
      { slug: { $in: slugs } },
      { $set: { isWellness: true } },
      { strict: false }
    );

    return NextResponse.json({ success: true, message: 'Wellness flag set successfully (Strict: false)' });
  } catch (error: any) {
    console.error('Error setting wellness flag:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
