export type Services = Service[];

export interface Service {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  url?: string;
  description: string;
  tags?: string;
  logo_path?: string;
  state: "running" | "stopped";
  lastUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum ServiceState {
  Running = "running",
  Stopped = "stopped",
}
