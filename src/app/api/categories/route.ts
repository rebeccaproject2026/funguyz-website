import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Category from '@/backend/models/Category';
import Subcategory from '@/backend/models/Subcategory';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({ isActive: true }).lean();
    const subcategories = await Subcategory.find({}).lean();

    // Group subcategories by category ID
    const populatedCategories = categories.map((cat: any) => {
      const subs = subcategories
        .filter((sub: any) => sub.category.toString() === cat._id.toString())
        .map((sub: any) => ({
          name: sub.name,
          groupName: sub.groupName || null
        }));

      return {
        ...cat,
        subcategories: subs,
      };
    });

    return NextResponse.json({ success: true, categories: populatedCategories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
