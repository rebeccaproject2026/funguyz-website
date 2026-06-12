import mongoose, { Schema, Model } from 'mongoose';
import { ISubcategory } from './interfaces/ISubcategory';

const SubcategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    groupName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Subcategory: Model<ISubcategory> = mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
