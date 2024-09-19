"use client";
import { AuthResponse, Host, Power, Service, Thermal, VM } from "./types";
import WebRestService from "@/lib/WebRestService";
import IBackend from "./IBackend";

class BackendService extends WebRestService implements IBackend {
  public async login(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    // const hashedPassword = await bcrypt.hash(password, 10);
    return this.post<AuthResponse>("/login", {
      username,
      password: password,
    }).then((res) => {
      this.dropAuthToken();
      this.saveAuthToken(res["x-auth-token"]);
      return res;
    });
  }

  public async register(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    // const hashedPassword = await bcrypt.hash(password, 10);
    return this.post<AuthResponse>("/register", {
      username,
      password: password,
    }).then((res) => {
      this.dropAuthToken();
      this.saveAuthToken(res["x-auth-token"]);
      return res;
    });
  }

  public async getAllServices(): Promise<Service[]> {
    return await this.get<Service[]>(`/service/services`);
  }

  public async getThermal(): Promise<Thermal> {
    return await this.get<Thermal>("/ilo/thermal");
  }

  public async getPower(): Promise<Power> {
    return await this.get<Power>("/ilo/power");
  }

  public async getHost(): Promise<Host> {
    return await this.get<Host>("/cloud/host");
  }

  public async getVms(): Promise<VM[]> {
    return await this.get<VM[]>("/cloud/vms");
  }
}

export default BackendService;
