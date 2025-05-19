import { Role, Permission } from "@/types/auth";
import { fetchApi, FetchOptions } from "@/lib/api/index";

export const rolesApi = {
  getAll: (options?: FetchOptions) => fetchApi<Role[]>("/users/roles", options),

  getUserRoles: (userId: string, options?: FetchOptions) =>
    fetchApi<Role>(`/users/${userId}/roles`, options),

  assignRoleToUser: (userId: string, roleId: string, options?: FetchOptions) =>
    fetchApi(`/users/${userId}/roles/${roleId}`, {
      method: "POST",
      ...options,
    }),

  removeRoleFromUser: (
    userId: string,
    roleId: string,
    options?: FetchOptions,
  ) =>
    fetchApi(`/users/${userId}/roles/${roleId}`, {
      method: "DELETE",
      ...options,
    }),
};

export const permissionsApi = {
  getAll: (options?: FetchOptions) =>
    fetchApi<Permission[]>("/users/permissions", options),

  getUserPermissions: (userId: string, options?: FetchOptions) =>
    fetchApi<Permission>(`/users/${userId}/permissions`, options),

  assignPermissionToRole: (
    roleId: string,
    permissionId: string,
    options?: FetchOptions,
  ) =>
    fetchApi(`/roles/${roleId}/permissions/${permissionId}`, {
      method: "POST",
      ...options,
    }),

  removePermissionFromRole: (
    roleId: string,
    permissionId: string,
    options?: FetchOptions,
  ) =>
    fetchApi(`/roles/${roleId}/permissions/${permissionId}`, {
      method: "DELETE",
      ...options,
    }),
};
