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
  // 指定した注文のトッピングを、渡した一覧にする（追加・変更どちらでも使う）
  setOrderToppings: (orderId: string, inputs: Omit<OrderToppingInput, 'orderId'>[]) => void;
};

export const useOrderToppingStore = create<OrderToppingState & OrderToppingActions>()(
  persist(
    (set) => ({
      orderToppings: [],
      setOrderToppings: (orderId, inputs) => {
        const now = new Date().toISOString();
        const newToppings: OrderTopping[] = inputs.map((input) => ({
          ...input,
          orderId,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        }));
        set((state) => ({
          orderToppings: [...newToppings, ...state.orderToppings.filter((topping) => topping.orderId !== orderId)],
        }));
      },
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
