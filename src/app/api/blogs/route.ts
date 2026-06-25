import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import BlogPost from '@/backend/models/BlogPost';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Fetch active blog posts sorted by publish date descending
    const blogs = await BlogPost.find({ isActive: true }).sort({ publishedAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      blogs
    });

  } catch (error: any) {
    console.error('Blogs API Error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

