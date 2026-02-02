import type {
  CreateExpenseData,
  ExpenseRepository as IExpenseRepository,
} from "../../../entities/expense/ExpenseRepository";
import { Expense } from "../../../entities/expense/Expense";
import { ExpenseId } from "../../../entities/expense/ExpenseId";
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";
import { ExpenseDocument, ExpenseModel } from "./expenseSchema";

// Convert Mongoose document -> Domain entity
function docToExpense(doc: ExpenseDocument): Expense {
  return new Expense(
    new ExpenseId(doc._id.toString()),
    new GroupId(doc.groupId),
    new UserId(doc.paidBy),
    doc.title,
    doc.totalAmount,
    {
      equal: doc.splitType?.equal ?? [],
      exact: doc.splitType?.exact ?? [],
      percentage: doc.splitType?.percentage ?? [],
    },
    doc.expenseDate,
    doc.notes ?? "",
    doc.createdAt,
    doc.updatedAt,
    doc.isDeleted
  );
}

export class MongoExpenseRepository implements IExpenseRepository {
  async createExpense(data: CreateExpenseData): Promise<Expense> {
    const doc = await ExpenseModel.create({
      groupId: data.groupId.toString(),
      paidBy: data.paidBy.toString(),
      title: data.title ?? "",
      totalAmount: data.totalAmount,
      splitType: {
        ...(data.splitType.equal !== undefined ? { equal: data.splitType.equal } : {}),
        ...(data.splitType.exact !== undefined ? { exact: data.splitType.exact } : {}),
        ...(data.splitType.percentage !== undefined ? { percentage: data.splitType.percentage } : {}),
      },
      expenseDate: data.expenseDate ?? new Date(),
      notes: data.notes ?? "",
      isDeleted: false,
    });
    return docToExpense(doc);
  }

  async getExpenseById(expenseId: ExpenseId): Promise<Expense | null> {
    const doc = await ExpenseModel.findById(expenseId.toString());
    return doc ? docToExpense(doc) : null;
  }

  async getExpensesByGroup(groupId: GroupId): Promise<Expense[]> {
    const docs = await ExpenseModel.find({
      groupId: groupId.toString(),
      isDeleted: false,
    });
    return docs.map(docToExpense);
  }

  async deleteExpense(expenseId: ExpenseId): Promise<void> {
    await ExpenseModel.findByIdAndUpdate(expenseId.toString(), {
      isDeleted: true,
    });
  }
}

export const expenseRepository = new MongoExpenseRepository();
