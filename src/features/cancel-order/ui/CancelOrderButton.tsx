import { useOrderStore } from '@/entities/order';
import { Button } from '@mui/material';
import { useState } from 'react';
import { CancelOrderModal } from './CancelOrderModal';

interface CancelOrderButtonProps {
  // 未選択（null）のときはボタンを無効にする
  id: string | null;
}

export const CancelOrderButton = ({ id }: CancelOrderButtonProps) => {
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        disabled={id === null}
        onClick={() => {
          setOpen(true);
        }}
      >
        取消
      </Button>
      <CancelOrderModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onCancel={() => {
          if (id !== null) cancelOrder(id);
          setOpen(false);
        }}
      />
    </>
  );
};
