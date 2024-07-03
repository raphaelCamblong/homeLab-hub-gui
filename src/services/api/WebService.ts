import { Service } from "./types/Service";
import { Config } from "./types/Config";

class WebService {
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  }

  public async get<T>(url: string): Promise<T> {
    return this.fetchData<T>(url);
  }

  public async getConfig(): Promise<Config> {
    try {
      const config = await this.get<Config>('/config.json');
      return config;
    } catch (error) {
      console.error('Failed to fetch config:', error);
      throw error;
    }
  }

  public async getAllServices(): Promise<Service[]> {
    try {
      const config = await this.getConfig();
      return config.services;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw error;
    }
  }
}

export default WebService;
