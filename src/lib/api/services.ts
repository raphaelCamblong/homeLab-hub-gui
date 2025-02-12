import { fetchApi, FetchOptions } from './config';
import type { Service } from '@/types/api/Service';

export const serviceApi = {
    getAll: (options?: FetchOptions) =>
        fetchApi<Service[]>('/service/services', options),

    getById: (id: string, options?: FetchOptions) =>
        fetchApi<Service>(`/service/services/${id}`, options),
}; 