import { Config } from "@/services/backend/types";

class WebRestService {
  private readonly token: string;

  constructor(private readonly baseUrl: string) {
    console.log("WebRestService constructor", baseUrl);
    this.baseUrl = baseUrl;
    this.token = process.env.NEXT_PUBLIC_ENV_BO_API_TOKEN ?? "";
  }

  public async getConfig(): Promise<Config> {
    return await this.get<Config>("/config.json");
  }

  public async get<T>(path: string): Promise<T> {
    return this.withErrorHandling(async () => await this.fetchData<T>(path));
  }

  public async post<T>(path: string, body: object): Promise<T> {
    return this.withErrorHandling(
      async () => await this.postData<T>(path, body),
    );
  }

  public withErrorHandling = async <T>(fn: () => Promise<T>) => {
    try {
      return await fn();
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  };

  private async postData<T>(path: string, body: object): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  }

  private async fetchData<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  }
}

export default WebRestService;
