import { z } from 'zod';

export const orderSchema = z.object({
  id: z.string(),
  pizzaId: z.string(),
  pizzaName: z.string(),
  pizzaPrice: z.number(),
  totalPrice: z.number(),
  isCancel: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;

// 注文登録時にフォームから受け取る値
export type OrderInput = Omit<Order, 'id' | 'isCancel' | 'createdAt' | 'updatedAt'>;
