import mongoose, { Document } from 'mongoose';

export enum EOrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface IOrder extends Document {
  customer?: mongoose.Types.ObjectId; // Optional for guest checkout
  guestEmail?: string;
  orderItems: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  subTotal: number;
  taxAmount: number;
  shippingAmount: number;
  couponApplied?: mongoose.Types.ObjectId;
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
