import { Document } from 'mongoose';

export enum ERole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
}

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: ERole;
  addresses: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
  }[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
