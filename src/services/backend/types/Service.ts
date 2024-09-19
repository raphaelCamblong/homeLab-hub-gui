export type Services = Service[];

export interface Service {
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  logo_path?: string;
  state?: ServiceState;
  createdAt?: string;
  updatedAt?: string;
}

export enum ServiceState {
  Running = "running",
  Stopped = "stopped",
}
