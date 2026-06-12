import mongoose, { Document } from 'mongoose';

export interface ISubcategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  groupName?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
