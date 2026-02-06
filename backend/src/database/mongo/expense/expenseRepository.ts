import type {
  CreateExpenseData,
  ExpenseRepository as IExpenseRepository,
  UpdateExpenseData,
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

  async getExpenseByIdAndGroup(groupId: GroupId, expenseId: ExpenseId): Promise<Expense | null> {
    const doc = await ExpenseModel.findOne({
      groupId: groupId.toString(),
      expressId: groupId.toString(),
    });
    return doc ? docToExpense(doc) : null;
  }

  async updateExpense(data: UpdateExpenseData): Promise<Expense | null> {
      const doc = await ExpenseModel.findOneAndUpdate({
        _id: data.expenseId.toString(),
      }, {
        ...(data.paidBy ? { paidBy: data.paidBy.toString() } : {}),
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.totalAmount !== undefined ? { totalAmount: data.totalAmount } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.expenseDate !== undefined ? { expenseDate: data.expenseDate } : {}),
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
        ...(data.splitType ? {
          splitType: {
            ...(data.splitType.equal !== undefined ? { equal: data.splitType.equal } : {}),
            ...(data.splitType.exact !== undefined ? { exact: data.splitType.exact } : {}),
            ...(data.splitType.percentage !== undefined ? { percentage: data.splitType.percentage } : {}),
          }
        } : {}),
        updatedAt: new Date(),
      });
      return doc ? docToExpense(doc) : null;
  }

  async deleteExpense(groupId: GroupId, expenseId: ExpenseId): Promise<Expense | null> {
    const expense: Expense | null = await ExpenseModel.findOneAndDelete({
      _id: expenseId.toString(),
      groupId: groupId.toString(),
    });
    return expense;
  }
}

export const expenseRepository = new MongoExpenseRepository();
