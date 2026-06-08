import mongoose, { Schema, Model } from 'mongoose';
import { ICategory } from './interfaces/ICategory';

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    gradientColors: {
      type: String,
      default: 'from-purple-100 to-pink-100',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent re-compilation of models in Next.js
const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
