import { useOrderStore, type Order } from '@/entities/order';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { Button } from '@mui/material';
import { useState } from 'react';

interface RestoreOrderButtonProps {
  // 未選択（null）のときはボタンを無効にする
  order: Order | null;
}

export const RestoreOrderButton = ({ order }: RestoreOrderButtonProps) => {
  const restoreOrder = useOrderStore((state) => state.restoreOrder);

  const [open, setOpen] = useState(false);
  return (
    <>
      {/* 未選択、または取消されていない注文は復元できない */}
      <Button variant='contained' disabled={order === null || !order.isCancel} onClick={() => setOpen(true)}>
        復元
      </Button>
      <ConfirmDialog
        open={open}
        title='注文復元'
        message='注文復元を行います'
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (order) restoreOrder(order.id);
          setOpen(false);
        }}
      />
    </>
  );
};
