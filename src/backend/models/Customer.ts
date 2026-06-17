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
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        province: String,
        postalCode: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    isDummyPassword: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    tempPasswordToken: { type: String },
    tempPasswordExpiresAt: { type: Date },
  },
  { timestamps: true, strictPopulate: false }
);

if (mongoose.models.Customer) {
  delete mongoose.models.Customer;
}

const Customer: Model<ICustomer> = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
