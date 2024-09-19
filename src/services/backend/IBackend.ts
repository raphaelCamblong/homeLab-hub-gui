import {
  AuthResponse,
  Host,
  Power,
  Service,
  Thermal,
  VM,
} from "@/services/backend/types";

interface IBackend {
  login(username: string, password: string): Promise<AuthResponse>;

  register(username: string, password: string): Promise<AuthResponse>;

  getAllServices(): Promise<Service[]>;

  getThermal(): Promise<Thermal>;

  getPower(): Promise<Power>;

  getHost(): Promise<Host>;

  getVms(): Promise<VM[]>;
}

export default IBackend;
