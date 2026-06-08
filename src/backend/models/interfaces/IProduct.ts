import mongoose, { Document } from 'mongoose';

export enum EProductStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  description: string;
  category: mongoose.Types.ObjectId;
  subcategory?: mongoose.Types.ObjectId;
  tags?: string[];
  stockLevel: number;
  status: EProductStatus;
  seoMetadata?: {
    titleTag: string;
    metaDescription: string;
    h1: string;
  };
  productSections?: {
    overview: { title: string; content: string; highlights: string[] };
    appearance?: { title: string; content: string; details: string[] };
    genetics?: { title: string; content: string; origin: string };
  };
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
