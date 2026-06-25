import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Product from '@/backend/models/Product';
import Category from '@/backend/models/Category';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const product = await Product.findOne({ slug })
      .populate({ path: 'category', select: 'name slug', model: Category })
      .lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error(`Error fetching product:`, error);
    return NextResponse.json(
      { success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
