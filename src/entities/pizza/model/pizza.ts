import { z } from 'zod';

export const pizzaSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  toppings: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Pizza = z.infer<typeof pizzaSchema>;
