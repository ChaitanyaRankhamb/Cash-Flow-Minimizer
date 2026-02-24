"use client";

import { createContext, useContext, useEffect, useState } from "react";
import getGroups, { GroupDTO } from "@/lib/api/getGroups";
import { useUser } from "./UserContext";

interface GroupContextType {
  groups: GroupDTO[];
  setGroups: React.Dispatch<React.SetStateAction<GroupDTO[]>>;
  loading: boolean;
  error: string | null;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [groups, setGroups] = useState<GroupDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) {
        setGroups([]);
        setLoading(false);
        return;
      }

      try {
        const response = await getGroups();

        if (response && response.success && response.data) {
          setGroups(response.data);
        } else {
          setError("Invalid group response");
        }
      } catch (err) {
        setError("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [user]);

  return (
    <GroupContext.Provider
      value={{ groups, setGroups, loading, error }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export function useGroups() {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error("useGroups must be used inside GroupProvider");
  }

  return context;
}
