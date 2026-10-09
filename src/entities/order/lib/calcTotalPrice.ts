import type { Order } from '../model/order';

export const calcTotalPrice = (orders: Order[]) => {
  const totalPrice = orders.reduce((total, order) => (order.isCancel ? total : total + order.totalPrice), 0);
  return totalPrice;
};
