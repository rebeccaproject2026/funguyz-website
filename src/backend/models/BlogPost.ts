import mongoose, { Schema, Model } from 'mongoose';

export interface IBlogPost extends mongoose.Document {
  title: string;
  slug: string;
  desc: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
  publishedAt: Date;
  isActive: boolean;
  isWellness?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
    category: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isWellness: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
