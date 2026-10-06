import { useOrderStore, useOrderToppingStore, type Order } from '@/entities/order/index';
import { Button } from '@mui/material';
import { useState } from 'react';
import { OrderFormModal } from './OrderFormModal';

interface UpdateButtonProps {
  // 未選択（null）のときはボタンを無効にする
  order: Order | null;
}

export const UpdateButton = ({ order }: UpdateButtonProps) => {
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const orderToppings = useOrderToppingStore((state) => state.orderToppings);
  const updateOrderToppings = useOrderToppingStore((state) => state.updateOrderToppings);

  // 注文変更モーダル開閉用
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' disabled={order === null} onClick={() => setOpen(true)}>
        変更
      </Button>
      {open && order && (
        <OrderFormModal
          title='注文を変更'
          submitLabel='注文を変更'
          // 選択中の注文のピザ・トッピングを初期値にする
          initialValues={{
            pizzaId: order.pizzaId,
            toppingIds: orderToppings.filter((topping) => topping.orderId === order.id).map((topping) => topping.toppingId),
          }}
          onClose={() => setOpen(false)}
          onSubmit={(input, toppings) => {
            updateOrder(order.id, input);
            updateOrderToppings(order.id, toppings);
          }}
        />
      )}
    </>
  );
};
