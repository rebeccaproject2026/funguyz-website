import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Product from '@/backend/models/Product';
import Category from '@/backend/models/Category';
import { EProductStatus } from '@/backend/models/interfaces/IProduct';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Ensure Category model is loaded for population
    Category.init();

    const { searchParams } = new URL(request.url);
    const categoryQuery = searchParams.get('category');
    const subcategoryQuery = searchParams.get('subcategory');
    const sortBy = searchParams.get('sortBy');

    const query: any = { status: { $ne: EProductStatus.OUT_OF_STOCK } };

    if (categoryQuery && categoryQuery !== 'All') {
      if (categoryQuery === 'Best Sellers') {
        // Assume Best Sellers are tagged as 'Best Seller'
        query.tags = { $in: ['Best Seller'] };
      } else {
        const cat = await Category.findOne({ name: categoryQuery });
        if (cat) {
          query.category = cat._id;
        }
      }
    }

    if (subcategoryQuery) {
      query.name = { $regex: subcategoryQuery, $options: 'i' };
    }

    let sortOption: any = {};
    if (sortBy === 'price-asc') sortOption.price = 1;
    else if (sortBy === 'price-desc') sortOption.price = -1;
    else if (sortBy === 'name-asc') sortOption.name = 1;

    const products = await Product.find(query)
      .populate('category')
      .sort(sortOption)
      .lean();

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

