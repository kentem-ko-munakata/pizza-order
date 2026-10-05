import { z } from 'zod';
import type { Topping } from '@/entities/topping';

export const pizzaSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  toppings: z.custom<Topping[]>,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Pizza = z.infer<typeof pizzaSchema>;
