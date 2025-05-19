"use client";

import { createContext, useContext, ReactNode } from "react";
import { Role, Permission } from "@/types/auth";

import { useSession } from "next-auth/react";

interface RBACContextType {
  role: Role;
  permissions: Permission[];
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

interface RBACProviderProps {
  children: ReactNode;
  role: Role;
  customPermissions?: Permission[];
}

export const RBACProvider = ({ children }: RBACProviderProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.roles[0];
  const permissions = user?.roles.flatMap((role) => role.permissions);

  const hasPermission = (permission: string): boolean => {
    return permissions?.some((p) => p.name === permission) ?? false;
  };

  const isAdmin = (): boolean => {
    return role?.name == "admin";
  };

  return (
    <RBACContext.Provider
      value={{
        role: role ?? ({} as Role),
        permissions: permissions ?? [],
        hasPermission,
        isAdmin,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error("useRBAC must be used within a RBACProvider");
  }
  return context;
};
