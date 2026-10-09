import { z } from 'zod';

export const toppingSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Topping = z.infer<typeof toppingSchema>;
