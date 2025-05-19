"use client";

import { useSession } from "next-auth/react";
import { RBACProvider } from "@/lib/providers/RBACContext";
import { Role } from "@/types/auth";

export function RBACWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const role = (session?.user?.role as Role) || "GUEST";

  return <RBACProvider role={role}>{children}</RBACProvider>;
}
