import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Product from '@/backend/models/Product';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const body = await request.json();
    const { name, text, rating } = body;

    if (!name || !text || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required review fields' },
        { status: 400 }
      );
    }

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Initialize if they don't exist
    if (!product.reviewsList) product.reviewsList = [];
    if (!product.reviewStats) product.reviewStats = { count: 0, averageRating: 5 };

    // Push new review
    product.reviewsList.push({ name, text, rating });

    // Recalculate stats
    product.reviewStats.count = product.reviewsList.length;
    const totalRating = product.reviewsList.reduce((acc: number, review: any) => acc + (review.rating || 5), 0);
    product.reviewStats.averageRating = Math.round((totalRating / product.reviewStats.count) * 10) / 10;

    await product.save();

    return NextResponse.json({ success: true, message: 'Review added successfully', product });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
