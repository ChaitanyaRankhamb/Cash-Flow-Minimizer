import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";

// mongoose interface document
export interface UserTokenDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  deviceId: string;
  token: string;
  expireAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// zod validation
export const UserTokenZodSchema = z.object({
  userId: z.string(),
  deviceId: z.string(),
  token: z.string().min(1, "Token is required"),
  expireAt: z.date(),
});

// mongoose schema
const UserTokenSchema = new Schema<UserTokenDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Optional: Auto-delete expired tokens (TTL Index)
 * MongoDB will automatically remove documents after expireAt one day
 */
UserTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 3600 });

export const UserTokenModel = mongoose.model<UserTokenDocument>(
  "UserToken",
  UserTokenSchema
);