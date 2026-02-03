import { Expense } from "../../../entities/expense/Expense";
import { Request, Response } from "express";
import { CreateExpenseData } from "../../../entities/expense/ExpenseRepository";
import { GroupId } from "../../../entities/group/GroupId";
import { UserId } from "../../../entities/user/UserId";
import { createExpenseService } from "../../../services/expense/createExpenseService";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../../lib/jwt";
import { ExpenseId } from "../../../entities/expense/ExpenseId";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const createExpenseController = async (
  req: Request<{ groupId: string }, {}, Omit<CreateExpenseData, "groupId" | "paidBy">>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);

    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized: User ID not found in request." });
      return;
    }
    const currentUserId = new UserId(req.user.userId); // Now guaranteed to be a string

    const body = req.body;

    if (!body.splits || body.splits.length === 0) {
      res.status(400).json({ message: "Expense splits are required" });
      return;
    }

    // Build CreateExpenseData object
    const expenseData: CreateExpenseData = {
      groupId,
      paidBy: currentUserId,
      title: body.title || "",
      totalAmount: body.totalAmount,
      splitType: body.splitType,
      splits: body.splits.map(s => ({
        userId: new UserId(s.userId.toString()),
        value: s.value,
      })),
      description: body.description || "",
      expenseDate: body.expenseDate ? new Date(body.expenseDate) : new Date(),
      notes: body.notes || "",
    };

    const expense: Expense | null = await createExpenseService(expenseData);

    if (!expense) {
      res.status(400).json({ message: "Expense Creation Failed! Please try again!" });
      return;
    }

    res.status(201).json({ message: "Expense Created Successfully!", expense });
  } catch (error: any) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getExpensesByGroupController = async (
  req: Request<{ groupId: string }>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);

    const expenses: Expense[] = await getExpenseByGroupService(groupId);

    res.status(200).json({
      message: "Expenses retrieved successfully",
      expenses, // [] is valid
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getExpenseByIdController = async (
  req: Request<{ groupId: string; expenseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);
    const expenseId = new ExpenseId(req.params.expenseId);

    const expense: Expense | null = await getExpenseByIdService(
      groupId,
      expenseId
    );

    if (!expense) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json({
      message: "Expense retrieved successfully",
      expense,
    });
  } catch (error) {
    console.error("Error fetching expense by id:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateExpenseController = async (
  req: Request<{ groupId: string; expenseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);
    const expenseId = new ExpenseId(req.params.expenseId);

    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const currentUserId = new UserId(req.user.userId);
    const body = req.body;

    const updatedExpense: Expense | null =
      await updateExpenseService({
        groupId,
        expenseId,
        paidBy: currentUserId,
        data: body,
      });

    if (!updatedExpense) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteExpenseController = async (
  req: Request<{ groupId: string; expenseId: string }>,
  res: Response
): Promise<void> => {
  try {
    const groupId = new GroupId(req.params.groupId);
    const expenseId = new ExpenseId(req.params.expenseId);

    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const currentUserId = new UserId(req.user.userId);

    const deleted = await deleteExpenseService(
      groupId,
      expenseId,
      currentUserId
    );

    if (!deleted) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

