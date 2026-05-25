import { createContext, useContext } from "react";

export type AdminContextValue = {
  pin: string;
  signOut: () => void;
};

export const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
