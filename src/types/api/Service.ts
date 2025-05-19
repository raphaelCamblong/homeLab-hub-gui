import { DBModel } from "../auth";
export type Services = Service[];

export interface Service extends DBModel {
  api_info: ApiInfo;
  description: string;
  ip: string;
  logo_url: string;
  metadata: Metadata;
  name: string;
  namespace: string;
  observability: Observability;
  port: number;
  security: Security;
  status: string;
  tags: string;
  type: string;
}

export interface ApiInfo {
  base_url: string;
  openapi_url: string;
}

export interface DeletedAt {
  time: string;
  valid: boolean;
}

export interface Metadata {
  environment: string;
  owner: string;
  version: string;
}

export interface Observability {
  deployed_at: string;
  health_status: string;
  last_checked_at: string;
  latency_ms: number;
  uptime_percent: number;
}

export interface Security {
  auth_required: boolean;
  tls: boolean;
}
