import { Document } from 'mongoose';

export enum ERole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
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
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
