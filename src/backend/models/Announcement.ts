import mongoose, { Schema, Model } from 'mongoose';

export interface IAnnouncement extends mongoose.Document {
  text: string;
  iconName: string;
  category: string;
  isActive: boolean;
  detailsTitle?: string;
  detailsContent?: string;
}

const AnnouncementSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    detailsTitle: {
      type: String,
    },
    detailsContent: {
      type: String,
    },
  },
  { timestamps: true }
);

const Announcement: Model<IAnnouncement> = mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);

export default Announcement;
