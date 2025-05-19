import { Role, User } from "@/types/auth";
import { fetchApi, FetchOptions } from "@/lib/api/index";

export interface UserResponse {
  users: User[];
  total: number;
  page: number;
  page_size: number;
}

export const usersApi = {
  getAll: (page = 1, pageSize = 10, options?: FetchOptions) =>
    fetchApi<UserResponse>(
      `/users?page=${page}&page_size=${pageSize}`,
      options,
    ),

  getMe: (options?: FetchOptions) => fetchApi<User>("/users/me", options),

  getById: (userId: string, options?: FetchOptions) =>
    fetchApi<User>(`/users/${userId}`, options),
};
