import { ApiKey } from "@/types/api/token";
import { fetchApi, FetchOptions } from "@/lib/api/index";

export const tokensApi = {
  getApiKeys: (options?: FetchOptions) =>
    fetchApi<ApiKey[]>("/users/api-keys", options),

  create: (data: { name: string }, options?: FetchOptions) =>
    fetchApi("/users/api-keys", {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  revoke: (keyId: number, options?: FetchOptions) =>
    fetchApi(`/users/api-keys/${keyId}`, {
      method: "DELETE",
      ...options,
    }),
};
