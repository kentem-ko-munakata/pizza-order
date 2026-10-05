import type { Order } from '@/entities/order';

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  return <div>OrderList</div>;
};
