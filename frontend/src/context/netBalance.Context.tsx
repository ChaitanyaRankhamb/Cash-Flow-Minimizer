"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGroups } from "./GroupContext";
import getNetBalance, { BalanceDTO } from "@/lib/api/getNetBalance";

export interface NetBalancesContextType {
  netBalances: BalanceDTO[];
  setNetBalances: React.Dispatch<React.SetStateAction<BalanceDTO[]>>;
  loading: boolean;
  error: string | null;
}

const NetBalanceContext = createContext<
  NetBalancesContextType | undefined
>(undefined);

export function NetBalanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { groups } = useGroups();

  const [netBalances, setNetBalances] = useState<BalanceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetBalance = async () => {
      if (!groups || groups.length === 0) {
        setNetBalances([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const balances = await getNetBalance(groups);
        setNetBalances(balances);
      } catch (err) {
        console.error("Failed to load net balance:", err);
        setError("Failed to load net balance!");
      } finally {
        setLoading(false);
      }
    };

    fetchNetBalance();
  }, [groups]);

  return (
    <NetBalanceContext.Provider
      value={{
        netBalances,
        setNetBalances,
        loading,
        error,
      }}
    >
      {children}
    </NetBalanceContext.Provider>
  );
}

export function useNetBalances() {
  const context = useContext(NetBalanceContext);

  if (!context) {
    throw new Error(
      "useNetBalances must be used within a NetBalanceProvider"
    );
  }

  return context;
}
