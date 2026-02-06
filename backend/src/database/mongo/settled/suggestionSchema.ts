import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";

export interface SuggestionDocument extends Document {
  _id: Types.ObjectId;
  groupId: Types.ObjectId;
  who: Types.ObjectId;     // debtor
  whom: Types.ObjectId;    // creditor
  amount: number;
  isSettled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const SuggestionZodSchema = z.object({
  groupId: z.string().min(1, "GroupId is required"),
  who: z.string().min(1, "Debtor userId is required"),
  whom: z.string().min(1, "Creditor userId is required"),
  amount: z.number().positive("Settlement amount must be greater than zero"),
  isSettled: z.boolean().default(false),
});

const SuggestionSchema = new Schema<SuggestionDocument>(
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
  },
  {
    timestamps: true,
  }
);

export const SuggestionModel = mongoose.model<SuggestionDocument>(
  "Suggestion",
  SuggestionSchema
);