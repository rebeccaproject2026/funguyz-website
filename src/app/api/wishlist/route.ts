import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import Product from '@/backend/models/Product';
import mongoose from 'mongoose';

// Ensure Product is registered in Mongoose
const ensureProductModel = () => {
  if (!mongoose.models.Product) {
    // Should be registered by importing, but just in case
    require('@/backend/models/Product');
  }
};

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    ensureProductModel();

    const customer = await Customer.findById(session.user.id).populate({ path: 'wishlist', strictPopulate: false });
    if (!customer) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, wishlist: customer.wishlist || [] });
  } catch (error: any) {
    console.error('GET /api/wishlist error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ success: false, message: 'productId is required' }, { status: 400 });
    }

    await connectDB();
    const customer = await Customer.findById(session.user.id);
    if (!customer) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Initialize if undefined
    if (!customer.wishlist) {
      customer.wishlist = [];
    }

    // Only add if not already in wishlist
    if (!customer.wishlist.includes(productId)) {
      customer.wishlist.push(productId);
      await customer.save();
    }

    return NextResponse.json({ success: true, wishlist: customer.wishlist });
  } catch (error: any) {
    console.error('POST /api/wishlist error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ success: false, message: 'productId is required' }, { status: 400 });
    }

    await connectDB();
    const customer = await Customer.findById(session.user.id);
    if (!customer) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (customer.wishlist) {
      customer.wishlist = customer.wishlist.filter((id: any) => id.toString() !== productId);
      await customer.save();
    }

    return NextResponse.json({ success: true, wishlist: customer.wishlist || [] });
  } catch (error: any) {
    console.error('DELETE /api/wishlist error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Sync local wishlist array to DB upon login
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { productIds } = await request.json();
    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json({ success: false, message: 'productIds array is required' }, { status: 400 });
    }

    await connectDB();
    const customer = await Customer.findById(session.user.id);
    if (!customer) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (!customer.wishlist) {
      customer.wishlist = [];
    }

    let modified = false;
    for (const pid of productIds) {
      if (mongoose.Types.ObjectId.isValid(pid)) {
        if (!customer.wishlist.includes(pid as any)) {
          customer.wishlist.push(pid as any);
          modified = true;
        }
      }
    }

    if (modified) {
      await customer.save();
    }

    return NextResponse.json({ success: true, wishlist: customer.wishlist });
  } catch (error: any) {
    console.error('PUT /api/wishlist error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

