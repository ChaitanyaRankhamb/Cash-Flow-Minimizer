"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useGroups } from "./GroupContext";
import getExpenses, { ExpenseDTO } from "@/lib/api/getExpenses";

interface ExpenseContextType {
  expenses: ExpenseDTO[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseDTO[] | null>>;
  loading: boolean;
  error: string | null;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const { groups } = useGroups();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<ExpenseDTO[] | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses = await getExpenses(groups);

        if (responses && Array.isArray(responses)) {
          setExpenses(responses);
        } else {
          setError("Responses not found!");
        }
      } catch (error: any) {
        setError("Failed to load expenses!");
      } finally {
        setLoading(false);
      }
    };

    if (groups.length === 0) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    fetchExpenses();
  }, [groups]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses: expenses ?? [],
        setExpenses,
        loading,
        error,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpenses must be used inside ExpenseProvider");
  }

  return context;
}
