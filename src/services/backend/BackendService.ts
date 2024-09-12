"use client";
import { Host, Power, Service, Thermal, VM } from "./types";
import WebRestService from "@/lib/WebRestService";
import IBackend from "./IBackend";
import bcrypt from "bcryptjs";

class BackendService extends WebRestService implements IBackend {
  public async login(username: string, password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.post<boolean>("/auth/login", {
      username,
      hashedPassword,
    });
  }

  public async register(username: string, password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.post<boolean>("/auth/register", {
      username,
      hashedPassword,
    });
  }

  public async getAllServices(): Promise<Service[]> {
    const services = await this.get<Service[]>(`/service/services`);
    services.forEach((service: Service) => {
      service.tags = service.tags.split(",");
    });
    return services;
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
