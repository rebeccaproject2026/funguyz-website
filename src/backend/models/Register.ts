import mongoose, { Schema, Model } from 'mongoose';
import { IRegister } from './interfaces/IRegister';

const RegisterSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Register: Model<IRegister> = mongoose.models.Register || mongoose.model<IRegister>('Register', RegisterSchema);

export default Register;
