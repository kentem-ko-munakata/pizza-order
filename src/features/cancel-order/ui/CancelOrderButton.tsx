import { useOrderStore } from '@/entities/order';
import { Button } from '@mui/material';
import { useState } from 'react';
import { CancelOrderModal } from './CancelOrderModal';

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
      <Button
        variant='contained'
        disabled={id === null || disabled}
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
