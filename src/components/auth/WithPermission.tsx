import { ReactNode } from "react";
import { Role } from "@/types/auth";

interface WithPermissionProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
}

export function WithPermission({
  children,
  permission,
  fallback = null,
}: WithPermissionProps) {
  return <>{children}</>;
}
