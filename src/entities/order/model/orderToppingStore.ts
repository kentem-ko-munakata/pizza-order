import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { z } from 'zod';
import { storageKey } from '@/shared/config/storage';
import { mergeWithSchema } from '@/shared/lib/persist';
import { orderToppingSchema, type OrderTopping, type OrderToppingInput } from './orderTopping';

type OrderToppingState = {
  orderToppings: OrderTopping[];
};

type OrderToppingActions = {
  addOrderTopping: (input: OrderToppingInput) => void;
  // 追加予定
  // updateOrder: (id: string, input:OrderInput) => void;
  // cancelOrder: (id: string) => void;
  // restoreOrder: (id: string) => void;
};

export const useOrderToppingStore = create<OrderToppingState & OrderToppingActions>()(
  persist(
    (set) => ({
      orderToppings: [],
      addOrderTopping: (input) => {
        const now = new Date().toISOString();
        const orderTopping: OrderTopping = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
        set((state) => ({ orderToppings: [orderTopping, ...state.orderToppings] }));
      },
      // 追加予定
      // updateOrder
      // cancelOrder
      // restoreOrder
    }),
    {
      name: storageKey('order-toppings'),
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ orderToppings: state.orderToppings }),
      version: 1,
      // 読み込んだデータを zod でチェックし、形が崩れていれば使わない
      merge: mergeWithSchema(z.object({ orderToppings: z.array(orderToppingSchema) })),
    },
  ),
);
