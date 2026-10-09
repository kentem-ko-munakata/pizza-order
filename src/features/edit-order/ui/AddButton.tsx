import { useOrderStore, useOrderToppingStore } from '@/entities/order/index';
import { Button } from '@mui/material';
import { useState } from 'react';
import { OrderFormModal } from './OrderFormModal';

export const AddButton = () => {
  const addOrder = useOrderStore((state) => state.addOrder);
  const setOrderToppings = useOrderToppingStore((state) => state.setOrderToppings);

  // 注文追加モーダル開閉用
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        追加
      </Button>
      {open && (
        <OrderFormModal
          title='注文を追加'
          submitLabel='注文を追加'
          onClose={() => setOpen(false)}
          onSave={(order, toppings) => {
            // orderIdは、トッピング登録時に使用
            const orderId = addOrder(order);
            setOrderToppings(orderId, toppings);
          }}
        />
      )}
    </>
  );
};
