import { Document } from 'mongoose';

export enum ECouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export interface ICoupon extends Document {
  code: string;
  discountType: ECouponType;
  discountValue: number;
  expirationDate?: Date;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
