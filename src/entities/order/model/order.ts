import type { Pizza } from '@/entities/pizza';
import type { Topping } from '@/entities/topping';
import { z } from 'zod';

export const orderSchema = z.object({
  id: z.string(),
  pizza: z.custom<Pizza>,
  toppings: z.custom<Topping>,
  isCancel: z.boolean,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;

// 注文登録時にフォームから受け取る値
export type OrderInput = Omit<Order, 'id' | 'isCancel' | 'createdAt' | 'updatedAt'>;
