import { createJSONStorage, persist } from 'zustand/middleware';
import { orderSchema, type Order, type OrderInput } from './order';
import { create } from 'zustand';
import { z } from 'zod';
import { storageKey } from '@/shared/config/storage';
import { mergeWithSchema } from '@/shared/lib/persist';

type OrderState = {
  orders: Order[];
};

type OrderActions = {
  addOrder: (input: OrderInput) => string;
  // 追加予定
  // updateOrder: (id: string, input:OrderInput) => void;
  cancelOrder: (id: string) => void;
  restoreOrder: (id: string) => void;
};

export const useOrderStore = create<OrderState & OrderActions>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (input) => {
        const now = new Date().toISOString();
        const id = crypto.randomUUID();
        const order: Order = { ...input, id, isCancel: false, createdAt: now, updatedAt: now };
        set((state) => ({ orders: [order, ...state.orders] }));
        return id;
      },
      // 追加予定
      // updateOrder
      cancelOrder: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  isCancel: true,
                  updatedAt: now,
                }
              : order,
          ),
        }));
      },
      // restoreOrder
      restoreOrder: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  isCancel: false,
                  updatedAt: now,
                }
              : order,
          ),
        }));
      },
    }),
    {
      name: storageKey('orders'),
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ orders: state.orders }),
      version: 1,
      // 読み込んだデータを zod でチェックし、形が崩れていれば使わない
      merge: mergeWithSchema(z.object({ orders: z.array(orderSchema) })),
    },
  ),
);
