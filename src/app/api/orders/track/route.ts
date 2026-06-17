import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Order from '@/backend/models/Order';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ success: false, error: 'Tracking code is required' }, { status: 400 });
    }

    await connectDB();

    // Find the order by matching the code against either orderNumber or trackingNumber
    const order = await Order.findOne({
      $or: [
        { orderNumber: { $regex: new RegExp(`^${code}$`, 'i') } },
        { trackingNumber: { $regex: new RegExp(`^${code}$`, 'i') } }
      ]
    }).select('orderNumber trackingNumber status createdAt updatedAt deliveryDetails');

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        trackingNumber: order.trackingNumber,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deliveryDetails: order.deliveryDetails
      }
    });

  } catch (error: any) {
    console.error('Tracking API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
