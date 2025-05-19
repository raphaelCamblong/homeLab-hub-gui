import { ReactNode } from "react";
import { useRBAC } from "@/lib/providers/RBACContext";
import { UserPermissions } from "@/types/auth";

interface WithPermissionProps {
  children: ReactNode;
  permission: keyof UserPermissions;
  fallback?: ReactNode;
}

export function WithPermission({
  children,
  permission,
  fallback = null,
}: WithPermissionProps) {
  // const { hasPermission } = useRBAC();

  // if (!hasPermission(permission)) {
  //   return <>{fallback}</>;
  // }

  return <>{children}</>;
}

interface WithPermissionsProps {
  children: ReactNode;
  permissions: (keyof UserPermissions)[];
  matchAll?: boolean;
  fallback?: ReactNode;
}

export function WithPermissions({
  children,
  permissions,
  matchAll = true,
  fallback = null,
}: WithPermissionsProps) {
  // const { hasPermission } = useRBAC();

  // const hasRequiredPermissions = matchAll
  //   ? permissions.every((permission) => hasPermission(permission))
  //   : permissions.some((permission) => hasPermission(permission));

  // if (!hasRequiredPermissions) {
  //   return <>{fallback}</>;
  // }

  return <>{children}</>;
}
