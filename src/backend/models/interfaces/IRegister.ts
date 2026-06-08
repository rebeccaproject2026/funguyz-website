import { Document } from 'mongoose';

export interface IRegister extends Document {
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
