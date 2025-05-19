import { fetchApi, FetchOptions } from "@/lib/api/index";

export const authApi = {
  register: (email: string, password: string, options?: FetchOptions) =>
    fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      ...options,
    }),
};
