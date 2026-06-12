import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Product from '@/backend/models/Product';
import Category from '@/backend/models/Category';
import { EProductStatus } from '@/backend/models/interfaces/IProduct';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    // Ensure Category model is loaded for population
    Category.init();

    const products = await Product.find({ status: { $ne: EProductStatus.OUT_OF_STOCK } })
      .populate('category')
      .lean();

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
