import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import BlogPost from '@/backend/models/BlogPost';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const body = await request.json();

    const blog = await BlogPost.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true }
    ).lean();

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error('Blog PUT Error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    
    // Fetch active blog post by slug
    const blog = await BlogPost.findOne({ slug: slug, isActive: true }).lean();

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog
    });

  } catch (error: any) {
    console.error('Blog by Slug API Error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}
