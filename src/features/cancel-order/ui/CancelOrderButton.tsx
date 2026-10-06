import { useOrderStore } from '@/entities/order';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { Button } from '@mui/material';
import { useState } from 'react';

interface CancelOrderButtonProps {
  // 未選択（null）のときはボタンを無効にする
  id: string | null;
  // 取消済みなど、呼び出し側の条件で無効にする場合に指定
  disabled?: boolean;
}

export const CancelOrderButton = ({ id, disabled = false }: CancelOrderButtonProps) => {
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant='contained' disabled={id === null || disabled} onClick={() => setOpen(true)}>
        取消
      </Button>
      <ConfirmDialog
        open={open}
        title='注文取消'
        message='注文取消を行います'
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (id !== null) cancelOrder(id);
          setOpen(false);
        }}
      />
    </>
  );
};
