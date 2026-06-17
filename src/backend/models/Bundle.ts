import mongoose, { Schema, Model } from 'mongoose';

export interface IBundle extends mongoose.Document {
  name: string;
  description?: string;
  type: string; // 'FEATURED', 'TRENDING'
  price: number;
  originalPrice?: number;
  discountText?: string;
  includedItems: string[];
  badge?: string; // e.g. "Entry Level", "Best Seller"
  icon?: string; // emoji or icon name
}

const BundleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ['FEATURED', 'TRENDING'],
      default: 'FEATURED',
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountText: {
      type: String,
    },
    includedItems: [
      {
        type: String,
      },
    ],
    badge: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Bundle: Model<IBundle> = mongoose.models.Bundle || mongoose.model<IBundle>('Bundle', BundleSchema);
