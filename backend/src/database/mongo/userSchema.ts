import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  isActive: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserZodSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  image: z.string().url().optional(),
  isActive: z.boolean().default(true),
  password: z.string().min(1, "Password is required"),
});

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
