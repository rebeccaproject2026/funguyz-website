import mongoose, { Schema, Model } from 'mongoose';
import { ICustomer, ERole } from './interfaces/ICustomer';

const CustomerSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    cashBalance: {
      type: Number,
      default: 0,
    },
    couponBalance: {
      type: Number,
      default: 0,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ERole),
      default: ERole.CUSTOMER,
    },
    addresses: [
      {
        street: String,
        city: String,
        province: String,
        postalCode: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    tempPasswordToken: { type: String },
    tempPasswordExpiresAt: { type: Date },
  },
  { timestamps: true }
);

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
