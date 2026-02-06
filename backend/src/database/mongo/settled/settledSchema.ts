import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";
import { Group } from "../../../entities/group/Group";

export interface SettledDocument extends Document {
  _id: Types.ObjectId;
  groupId: Types.ObjectId;  // group
  who: Types.ObjectId;      // debtor
  whom: Types.ObjectId;     // creditor
  amount: number;
  isSettled: boolean;
  creditedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const SettledZodSchema = z.object({
  groupId: z.string().min(1, "group Id is required"),
  who: z.string().min(1, "Debtor userId is required"),
  whom: z.string().min(1, "Creditor userId is required"),
  amount: z.number().positive("Settlement amount must be greater than zero"),
  isSettled: z.boolean().default(false),
});

const SettledSchema = new Schema<SettledDocument>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    who: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    whom: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    isSettled: {
      type: Boolean,
      default: false,
    },
    creditedAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SettledModel = mongoose.model<SettledDocument>(
  "Settled",
  SettledSchema
);