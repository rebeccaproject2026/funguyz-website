import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Category from '@/backend/models/Category';
import Product from '@/backend/models/Product';
import { EProductStatus } from '@/backend/models/interfaces/IProduct';

export async function GET() {
  try {
    await connectDB();

    // 1. Find or create the "Functional mushroom capsules" category
    let category = await Category.findOne({ slug: 'functional-mushroom-capsules' });
    
    if (!category) {
      category = await Category.create({
        name: 'Functional mushroom capsules',
        slug: 'functional-mushroom-capsules',
        description: 'Premium functional mushroom capsules for daily wellness.',
        isActive: true,
      });
    }

    // 2. Check if Chaga product already exists
    let product = await Product.findOne({ slug: 'chaga-capsules' });

    if (product) {
      // Product exists, nothing to update for static images
      await product.save();
      return NextResponse.json({ message: 'Product already existed.', product });
    }

    // 3. Create the Chaga Capsules product
    product = await Product.create({
      name: 'Chaga Capsules',
      slug: 'chaga-capsules',
      price: 49.99,
      description: 'High-quality Chaga mushroom extract capsules. Known as the King of Mushrooms, packed with antioxidants to support immune health and overall vitality.',
      category: category._id,
      stockLevel: 100,
      status: EProductStatus.IN_STOCK,
      seoMetadata: {
        titleTag: 'Buy Chaga Capsules Online | FunGuyz',
        metaDescription: 'Premium Chaga mushroom capsules for immune support.',
        h1: 'Chaga Mushroom Capsules',
      },
      productSections: {
        overview: {
          title: 'Overview',
          content: 'Our Chaga capsules are made from 100% organic Chaga extract.',
          highlights: ['High in Antioxidants', 'Immune Support', 'Easy to swallow capsules']
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully seeded Chaga Capsules into the database!',
      product 
    });

  } catch (error: any) {
    console.error('Seeding Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
