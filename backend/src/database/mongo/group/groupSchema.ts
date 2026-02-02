import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";

export interface GroupDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  createdBy: string; // UserId as string (reference to User)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const GroupZodSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(5).max(500),
  createdBy: z.string().min(1, "CreatedBy (UserId) is required"),
  isActive: z.boolean().default(true),
});

const GroupSchema = new Schema<GroupDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: String, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GroupModel = mongoose.model<GroupDocument>("Group", GroupSchema);
