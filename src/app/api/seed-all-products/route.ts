import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Category from '@/backend/models/Category';
import Product from '@/backend/models/Product';
import { EProductStatus } from '@/backend/models/interfaces/IProduct';
import { 
  products, 
  getProductSlug, 
  getCategorySlug, 
  getProductSeoMetadata, 
  getProductSections, 
  mushroomPricingTable 
} from '@/data/products';

function getCompoundsForCategory(category: string) {
  if (category === 'Edibles') return { thc: '0%', cbd: 'Psilocybin', cbn: 'Trace' };
  if (category === 'Capsules') return { thc: 'Sub-P', cbd: 'Adaptogens', cbn: 'NGF' };
  if (category === 'Microdose') return { thc: '50-200mg', cbd: "Lion's Mane", cbn: 'Niacin' };
  return { thc: '0.63%', cbd: '0.05%', cbn: '0.02%' };
}

export async function GET() {
  try {
    await connectDB();
    console.log('Starting massive database seed from static products.ts...');

    const createdProducts = [];
    const createdCategories = new Map();

    for (const [name, categoryName, priceStr, tag] of products) {
      // 1. Get or Create Category
      const catSlug = getCategorySlug(categoryName);
      let categoryId = createdCategories.get(catSlug);

      if (!categoryId) {
        let dbCategory = await Category.findOne({ slug: catSlug });
        if (!dbCategory) {
          dbCategory = await Category.create({
            name: categoryName,
            slug: catSlug,
            description: `Premium ${categoryName.toLowerCase()} products.`,
            isActive: true,
          });
        }
        categoryId = dbCategory._id;
        createdCategories.set(catSlug, categoryId);
      }

      // 2. Prepare Data
      const slug = getProductSlug(name);
      const priceNum = parseFloat(priceStr.replace('$', ''));
      const seoData = getProductSeoMetadata(name, categoryName);
      const sectionsData = getProductSections(name, categoryName, seoData.description);
      const compounds = getCompoundsForCategory(categoryName);

      // Handle pricing array based on pricing table or default
      const pricingMap = mushroomPricingTable[name] || { '3.5g': priceNum };
      const pricingArray = Object.entries(pricingMap).map(([weight, price]) => ({
        weight,
        price: price as number,
      }));

      // 3. Upsert Product
      const product = await Product.findOneAndUpdate(
        { slug }, // Find by slug
        {
          $set: {
            name,
            slug,
            price: priceNum,
            description: seoData.description,
            category: categoryId,
            tags: [tag],
            stockLevel: 100,
            status: EProductStatus.IN_STOCK,
            seoMetadata: {
              titleTag: seoData.titleTag,
              metaDescription: seoData.metaDescription,
              h1: seoData.h1,
            },
            productSections: sectionsData,
            pricing: pricingArray,
            compounds,
            reviewStats: {
              count: 48,
              averageRating: 5,
            },
            reviewsList: [
              {
                name: 'Sarah M.',
                text: 'Outstanding customer service and extremely discreet packaging. Delivered in 2 days!',
                rating: 5,
              },
              {
                name: 'David K.',
                text: 'Excellent product! Completely organic and zero heavy body load.',
                rating: 5,
              }
            ]
          }
        },
        { new: true, upsert: true } // Upsert (insert if not found, update if found)
      );

      createdProducts.push(product.name);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${createdProducts.length} products into the database!`,
      products: createdProducts 
    });

  } catch (error: any) {
    console.error('Mass Seeding Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
