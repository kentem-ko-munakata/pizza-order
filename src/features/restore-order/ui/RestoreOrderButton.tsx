import { useOrderStore } from '@/entities/order';
import { Button } from '@mui/material';
import { useState } from 'react';
import { RestoreOrderModal } from './RestoreOrderModal';

interface RestoreOrderButtonProps {
  // 未選択（null）のときはボタンを無効にする
  id: string | null;
  // 取消されていないなど、呼び出し側の条件で無効にする場合に指定
  disabled?: boolean;
}

export const RestoreOrderButton = ({ id, disabled = false }: RestoreOrderButtonProps) => {
  const restoreOrder = useOrderStore((state) => state.restoreOrder);

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
        復元
      </Button>
      <RestoreOrderModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onCancel={() => {
          if (id !== null) restoreOrder(id);
          setOpen(false);
        }}
      />
    </>
  );
};
