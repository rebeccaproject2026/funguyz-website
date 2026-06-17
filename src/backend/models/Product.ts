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
      popularity: { title: String, content: String, rank: String },
      whyChooseUs: { title: String, points: [{ title: String, desc: String }] },
      strainInfo: { title: String, specs: [{ label: String, value: String }] },
      faq: { title: String, items: [{ q: String, a: String }] },
    },
    pricing: [
      {
        weight: String,
        price: Number,
      }
    ],
    reviewsList: [
      {
        name: String,
        text: String,
        rating: Number,
      }
    ],
    reviewStats: {
      count: { type: Number, default: 0 },
      averageRating: { type: Number, default: 5 },
    },
    potency: {
      tier: String,
      percent: Number,
      pctRange: String,
      color: String,
    },
    compounds: {
      thc: String,
      cbd: String,
      cbn: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    badge: {
      type: String,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
