import { fetchApi, FetchOptions } from "@/lib/api/index";
import type { Service } from "@/types/api/Service";

export const serviceApi = {
  getAll: (options?: FetchOptions) => fetchApi<Service[]>("/services", options),

  getById: (id: string, options?: FetchOptions) =>
    fetchApi<Service>(`/services/${id}`, options),
};
