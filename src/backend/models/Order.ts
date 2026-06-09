import mongoose, { Schema, Model } from 'mongoose';
import { IOrder, EOrderStatus } from './interfaces/IOrder';

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    guestEmail: String,
    deliveryDetails: {
      date: String,
      timeSlot: String,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
        },
        title: { type: String, required: true },
        imageSrc: { type: String },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    taxAmount: { type: Number, required: true, default: 0 },
    shippingAmount: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    status: {
      type: String,
      enum: Object.values(EOrderStatus),
      default: EOrderStatus.PENDING,
    },
    trackingNumber: String,
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
