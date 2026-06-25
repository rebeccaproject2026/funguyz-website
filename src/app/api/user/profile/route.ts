import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/backend/config/db';
import Customer from '@/backend/models/Customer';
import Order from '@/backend/models/Order';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const customer = await Customer.findById(session.user.id).lean();
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    const orders = await Order.find({
      $or: [
        { customer: session.user.id },
        { guestEmail: customer.email.toLowerCase() },
        { guestEmail: customer.email } // In case case-sensitivity matters
      ]
    })
      .sort({ createdAt: -1 })
      .lean();

    // Map orders to the expected frontend interface
    const mappedOrders = orders.map((order: any) => ({
      orderId: order.orderNumber,
      date: new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      grandTotal: `$${order.totalAmount.toFixed(2)}`,
      items: order.orderItems,
      deliveryDetails: order.deliveryDetails,
      trackingCode: order.trackingNumber,
      status: order.status,
    }));

    return NextResponse.json({
      success: true,
      profile: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        addresses: customer.addresses || [],
        cashBalance: customer.cashBalance || 0,
      },
      orders: mappedOrders,
    });

  } catch (error: any) {
    console.error('Profile GET Error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email, addresses } = body;

    await connectDB();

    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined && email.trim() !== '') {
      const existingUser = await Customer.findOne({ 
        email: email.trim().toLowerCase(), 
        _id: { $ne: session.user.id } 
      });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Email is already in use by another account.' }, { status: 400 });
      }
      updateData.email = email.trim().toLowerCase();
    }
    if (addresses !== undefined) updateData.addresses = addresses;

    const customer = await Customer.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { returnDocument: 'after' }
    ).lean();

    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        addresses: customer.addresses || [],
      }
    });

  } catch (error: any) {
    console.error('Profile PUT Error:', error);
    return NextResponse.json({ success: false, error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

