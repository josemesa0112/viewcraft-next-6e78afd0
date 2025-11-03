import { api } from './api';
import { z } from 'zod';

export const PaymentSchema = z.object({
  id: z.number(),
  providerId: z.number(),
  amount: z.number().positive(),
  date: z.string().datetime(),
  description: z.string().trim().max(500).optional(),
  status: z.enum(['pending', 'completed', 'cancelled']),
  createdAt: z.string().datetime().optional(),
});

export const CreatePaymentSchema = PaymentSchema.omit({ id: true, createdAt: true });

export type Payment = z.infer<typeof PaymentSchema>;
export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

export const paymentService = {
  getAll: async (): Promise<Payment[]> => {
    const response = await api.get('/api/pagos');
    return response.data;
  },

  getByProviderId: async (providerId: number): Promise<Payment[]> => {
    const response = await api.get(`/api/pagos/proveedor/${providerId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Payment> => {
    const response = await api.get(`/api/pagos/${id}`);
    return response.data;
  },

  create: async (payment: CreatePayment): Promise<Payment> => {
    const validated = CreatePaymentSchema.parse(payment);
    const response = await api.post('/api/pagos', validated);
    return response.data;
  },

  schedule: async (payment: CreatePayment): Promise<Payment> => {
    const validated = CreatePaymentSchema.parse(payment);
    const response = await api.post('/api/pagos/schedule', validated);
    return response.data;
  },

  update: async (id: number, payment: Partial<CreatePayment>): Promise<Payment> => {
    const response = await api.put(`/api/pagos/${id}`, payment);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/pagos/${id}`);
  },

  updateStatus: async (id: number, status: Payment['status']): Promise<Payment> => {
    const response = await api.patch(`/api/pagos/${id}/status`, { status });
    return response.data;
  },
};
