import mongoose, { Schema } from 'mongoose';
import { ISupportTicket } from './interfaces/ISupportTicket';

const SupportTicketSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

export const SupportTicket = mongoose.models.SupportTicket || mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema);
