"use client"

import UserFetch, { UserDTO } from "@/lib/api/userFetch";
import { useEffect, useState, createContext, useContext } from "react";

export interface UserContentType {
  user: UserDTO | null;
  setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

const UserContext = createContext<UserContentType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (path.startsWith("/login") || path.startsWith("/signup")) {
          return;
        }
      }

      const response = await UserFetch();

      if (response && "data" in response && response.data) {
        setUser(response.data);
      }
    }

    fetchUser();
  }, []);

  return (
     <UserContext.Provider value={{ user, setUser }}>
     {children}
   </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("User must be used within user provider!");
  }

  return context;
}
