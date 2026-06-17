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
    popularity?: { title: string; content: string; rank: string };
    whyChooseUs?: { title: string; points: { title: string; desc: string }[] };
    strainInfo?: { title: string; specs: { label: string; value: string }[] };
    faq?: { title: string; items: { q: string; a: string }[] };
  };
  pricing?: { weight: string; price: number }[];
  reviewsList?: { name: string; text: string; rating: number }[];
  reviewStats?: { count: number; averageRating: number };
  potency?: { tier: string; percent: number; pctRange: string; color: string };
  compounds?: { thc: string; cbd: string; cbn: string };
  deleted: boolean;
  image?: string;
  badge?: string;
  isTrending?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
