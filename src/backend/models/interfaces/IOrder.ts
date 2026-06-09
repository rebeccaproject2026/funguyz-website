import mongoose, { Document } from 'mongoose';

export enum EOrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface IOrder extends Document {
  orderNumber: string;
  customer?: mongoose.Types.ObjectId; // Optional for guest checkout
  guestEmail?: string;
  deliveryDetails?: {
    date: string;
    timeSlot: string;
  };
  orderItems: {
    product?: mongoose.Types.ObjectId;
    title: string;
    imageSrc?: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  subTotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount?: number;
  couponCode?: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  status: EOrderStatus;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
