import { ObjectId } from './../../../../node_modules/bson/src/objectid';
import mongoose, { Schema, Document, Types } from "mongoose";
import z from "zod";

export interface ExpenseSplitDocument extends Document {
  _id: Types.ObjectId;
  expenseId: Types.ObjectId;   // reference to Expense
  userId: Types.ObjectId;      // reference to User
  amount: number;
  percentage?: number | undefined; // optional
  isSettled: boolean;
  createdAt: Date;
}

// Zod schema for validation
export const ExpenseSplitZodSchema = z.object({
  expenseId: z.string().min(1, "ExpenseId is required"),
  userId: z.string().min(1, "UserId is required"),
  amount: z.number().positive("Amount must be positive"),
  percentage: z.number().min(0).max(100).optional(),
  isSettled: z.boolean().default(false),
});

// Mongoose schema
const ExpenseSplitSchema = new Schema<ExpenseSplitDocument>(
  {
    expenseId: { type: Schema.Types.ObjectId, ref: "Expense", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    percentage: { type: Number, min: 0, max: 100 },
    isSettled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ExpenseSplitModel = mongoose.model<ExpenseSplitDocument>(
  "ExpenseSplit",
  ExpenseSplitSchema
);
