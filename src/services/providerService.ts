import { api } from './api';
import { z } from 'zod';

export const ProviderSchema = z.object({
  id: z.number(),
  nombre: z.string().trim().min(1).max(100),
  nit: z.string().trim().min(1).max(20),
  email: z.string().trim().email().max(255),
  telefono: z.string().trim().min(1).max(20),
  direccion: z.string().trim().min(1).max(255),
  createdAt: z.string().datetime().optional(),
});

export const CreateProviderSchema = ProviderSchema.omit({ id: true, createdAt: true });

export type Provider = z.infer<typeof ProviderSchema>;
export type CreateProvider = z.infer<typeof CreateProviderSchema>;

export const providerService = {
  getAll: async (): Promise<Provider[]> => {
    const response = await api.get('/api/proveedores');
    return response.data;
  },

  getById: async (id: number): Promise<Provider> => {
    const response = await api.get(`/api/proveedores/${id}`);
    return response.data;
  },

  create: async (provider: CreateProvider): Promise<Provider> => {
    const validated = CreateProviderSchema.parse(provider);
    const response = await api.post('/api/proveedores', validated);
    return response.data;
  },

  update: async (id: number, provider: Partial<CreateProvider>): Promise<Provider> => {
    const response = await api.put(`/api/proveedores/${id}`, provider);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/proveedores/${id}`);
  },

  checkNitExists: async (nit: string): Promise<boolean> => {
    const response = await api.get(`/api/proveedores/check-nit/${nit}`);
    return response.data.exists;
  },
};
