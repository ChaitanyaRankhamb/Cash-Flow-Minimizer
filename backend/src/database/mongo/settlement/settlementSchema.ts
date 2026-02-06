import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";

export interface SettlementDocument extends Document {
  _id: Types.ObjectId;
  groupId: Types.ObjectId;
  suggestionId: Types.ObjectId;
  who: Types.ObjectId;          // debtor
  whom: Types.ObjectId;         // creditor
  amount: number;
  confirmedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const SettlementZodSchema = z.object({
  groupId: z.string().min(1, "GroupId is required"),
  suggestionId: z.string().min(1, "SuggestionId is required"),
  who: z.string().min(1, "Debtor userId is required"),
  whom: z.string().min(1, "Creditor userId is required"),
  amount: z.number().positive("Settlement amount must be greater than zero"),
  confirmedBy: z.string().min(1, "ConfirmedBy userId is required"),
});

const SettlementSchema = new Schema<SettlementDocument>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    suggestionId: {
      type: Schema.Types.ObjectId,
      ref: "Suggestion",
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
    confirmedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SettlementModel = mongoose.model<SettlementDocument>(
  "Settlement",
  SettlementSchema
);