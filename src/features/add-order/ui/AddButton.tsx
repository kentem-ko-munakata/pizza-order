import { useOrderStore, useOrderToppingStore } from '@/entities/order/index';
import { Button } from '@mui/material';
import { useState } from 'react';
import { AddOrderFormModal } from './AddOrderFormModal';

export const AddButton = () => {
  const addOrder = useOrderStore((state) => state.addOrder);
  const addOrderTopping = useOrderToppingStore((state) => state.addOrderTopping);

  // 注文追加モーダル開閉用
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        追加
      </Button>
      <AddOrderFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmitOrder={addOrder}
        onSubmitTopping={addOrderTopping}
      />
    </>
  );
};
