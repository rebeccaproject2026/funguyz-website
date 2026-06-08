import mongoose, { Document } from 'mongoose';

export interface ISubcategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
