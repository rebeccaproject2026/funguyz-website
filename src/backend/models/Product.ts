import mongoose, { Schema, Model } from 'mongoose';
import { IProduct, EProductStatus } from './interfaces/IProduct';

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
    tags: [
      {
        type: String,
      },
    ],
    stockLevel: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(EProductStatus),
      default: EProductStatus.OUT_OF_STOCK,
    },
    seoMetadata: {
      titleTag: String,
      metaDescription: String,
      h1: String,
    },
    productSections: {
      overview: { title: String, content: String, highlights: [String] },
      appearance: { title: String, content: String, details: [String] },
      genetics: { title: String, content: String, origin: String },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
