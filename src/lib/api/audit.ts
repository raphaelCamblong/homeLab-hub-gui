import { AuditLog } from "@/types/api/audit";
import { fetchApi, FetchOptions } from "@/lib/api/index";

export interface AuditLogResponse {
  logs: AuditLog[];
  total: number;
  page: number;
  page_size: number;
}

export const auditApi = {
  getLogs: (page = 1, pageSize = 10, options?: FetchOptions) =>
    fetchApi<AuditLogResponse>(
      `/audit-logs?page=${page}&page_size=${pageSize}`,
      options,
    ),
};
