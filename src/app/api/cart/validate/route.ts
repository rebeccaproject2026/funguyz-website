import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Product from '@/backend/models/Product';
import { EProductStatus } from '@/backend/models/interfaces/IProduct';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: 'Invalid cart items' }, { status: 400 });
    }

    const validatedItems = [];
    let cartModified = false;

    for (const item of items) {
      if (!item.title) continue;

      // Extract name and weight from title, e.g., "Penis Envy (14g)"
      const match = item.title.match(/^(.*?)(?:\s*\((.*?)\))?$/);
      if (!match) continue;

      const productName = match[1].trim();
      const weight = match[2]?.trim();

      const product = await Product.findOne({
        name: new RegExp(`^${productName}$`, 'i'),
        status: { $ne: EProductStatus.OUT_OF_STOCK }
      }).lean() as any;

      if (!product) {
        // Product not found or out of stock, drop it or mark it invalid
        // (For now, we'll skip dropping it to avoid totally erasing custom bundles without DB counterparts, 
        // but for a strict ecommerce site, we would drop it. Let's just keep the original item if not found 
        // to support the 'Custom Bundle' frontend logic for now, or we can flag it).
        if (item.title.toLowerCase().includes('bundle')) {
            validatedItems.push(item);
        }
        continue;
      }

      let truePrice = product.price;

      if (weight && product.pricing && product.pricing.length > 0) {
        const pricingOption = product.pricing.find((p: any) => p.weight.toLowerCase() === weight.toLowerCase());
        if (pricingOption && pricingOption.price != null) {
          truePrice = pricingOption.price;
        }
      }

      const formattedTruePrice = `$${truePrice.toFixed(2)}`;
      
      if (item.price !== formattedTruePrice) {
        cartModified = true;
      }

      validatedItems.push({
        ...item,
        price: formattedTruePrice, // Overwrite with true DB price
        imageSrc: product.heroImage || item.imageSrc, // Optionally update image
      });
    }

    return NextResponse.json({
      success: true,
      modified: cartModified,
      items: validatedItems,
    });
  } catch (error: any) {
    console.error('Cart validation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
