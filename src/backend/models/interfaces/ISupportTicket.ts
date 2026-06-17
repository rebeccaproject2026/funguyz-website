import { Document } from 'mongoose';

export interface ISupportTicket extends Document {
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject?: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}
