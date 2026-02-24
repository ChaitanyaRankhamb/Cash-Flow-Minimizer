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
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username must contain at most 30 characters." }),
  email: z.string()
    .email({ message: "Invalid email format." }),
  emailVerified: z.boolean().default(false),
  image: z.string().url({ message: "Image must be a valid URL." }).optional(),
  isActive: z.boolean().default(true),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(64, { message: "Password must be at most 64 characters." }),
}).strict();

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
