import { z } from 'zod';

export const orderToppingSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  toppingId: z.string(),
  toppingName: z.string(),
  toppingPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OrderTopping = z.infer<typeof orderToppingSchema>;

// 注文登録時にフォームから受け取る値
export type OrderToppingInput = Omit<OrderTopping, 'id' | 'createdAt' | 'updatedAt'>;
