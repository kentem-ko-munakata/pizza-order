import { useOrderStore, type Order } from '@/entities/order';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { Button } from '@mui/material';
import { useState } from 'react';

interface CancelOrderButtonProps {
  // 未選択（null）のときはボタンを無効にする
  order: Order | null;
}

export const CancelOrderButton = ({ order }: CancelOrderButtonProps) => {
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  const [open, setOpen] = useState(false);
  return (
    <>
      {/* 未選択、または取消済みの注文は取消できない */}
      <Button variant='contained' disabled={order === null || order.isCancel} onClick={() => setOpen(true)}>
        取消
      </Button>
      <ConfirmDialog
        open={open}
        title='注文取消'
        message='注文取消を行います'
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (order) cancelOrder(order.id);
          setOpen(false);
        }}
      />
    </>
  );
};
