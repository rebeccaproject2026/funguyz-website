import mongoose, { Schema, Model } from 'mongoose';
import { ICoupon, ECouponType } from './interfaces/ICoupon';

const CouponSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: Object.values(ECouponType),
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    expirationDate: Date,
    usageLimit: Number,
    timesUsed: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coupon: Model<ICoupon> = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
