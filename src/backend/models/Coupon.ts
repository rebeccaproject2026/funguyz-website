import mongoose, { Document, Model } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discount: string;
  discountLabel: boolean;
  title: string;
  description: string;
  expiry: string;
  terms: string;
  featured: boolean;
  iconName: string;
  gradient: string;
  badge: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discount: {
      type: String,
      required: true,
    },
    discountLabel: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    terms: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: 'Sparkles',
    },
    gradient: {
      type: String,
    },
    badge: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recompiling the model if it already exists
const Coupon: Model<ICoupon> = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
