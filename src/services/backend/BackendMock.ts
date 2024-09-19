import { AuthResponse, Host, Power, Service, Thermal, VM } from "./types";
import WebRestService from "@/lib/WebRestService";
import IBackend from "./IBackend";

class BackendMock extends WebRestService implements IBackend {
  public async login(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    return { "x-auth-token": `Bearer ${username}:${password}` };
  }

  public async register(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    return { "x-auth-token": `Bearer ${username}:${password}` };
  }

  public async getAllServices(): Promise<Service[]> {
    return await this.getConfig().then((config) => config.services);
  }

  public async getThermal(): Promise<Thermal> {
    return await this.get<Thermal>("/thermal.json");
  }

  public async getPower(): Promise<Power> {
    return await this.get<Power>("/power.json");
  }

  public async getHost(): Promise<Host> {
    return await this.get<Host>("/hosts.json");
  }

  public async getVms(): Promise<VM[]> {
    return await this.get<VM[]>("/vms.json");
  }
}

export default BackendMock;
