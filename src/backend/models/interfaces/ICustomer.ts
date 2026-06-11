import mongoose, { Document } from 'mongoose';

export enum ERole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
}

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cashBalance: number;
  couponBalance: number;
  passwordHash: string;
  role: ERole;
  addresses: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
  }[];
  wishlist?: mongoose.Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  tempPasswordToken?: string;
  tempPasswordExpiresAt?: Date;
  deleted: boolean;
  isDummyPassword?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
