export interface Service {
    id: string;
    name: string;
    url: string;
    description: string;
    tags: string[];
    logo_path?: string;
    state?: "running" | "stopped";
    createdAt?: string;
    updatedAt?: string;
}