"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useGroups } from "./GroupContext";
import getSuggestions, { SuggestionDTO } from "@/lib/api/getSuggestions";

export interface SuggestionContextType {
  suggestions: SuggestionDTO[];
  setSuggestions: React.Dispatch<React.SetStateAction<SuggestionDTO[] | null>>;
  loading: boolean;
  error: string | null;
}

const suggestionContext = createContext<SuggestionContextType | undefined>(
  undefined
);

export function SuggestionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { groups } = useGroups();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionDTO[] | null>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses = await getSuggestions(groups);

        if (responses && Array.isArray(responses)) {
          setSuggestions(responses);
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
      setSuggestions([]);
      setLoading(false);
      return;
    }

    fetchSuggestion();
  }, [groups]);

  return (
    <suggestionContext.Provider
      value={{
        suggestions: suggestions ?? [],
        setSuggestions: setSuggestions,
        loading,
        error,
      }}
    >
      {children}
    </suggestionContext.Provider>
  );
}

export function useSuggestions() {
  const context = useContext(suggestionContext);

  if (!context) {
    throw new Error("useExpenses must be used inside SuggestionProvider");
  }

  return context;
}



