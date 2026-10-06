import { useOrderStore } from '@/entities/order';
import { Button } from '@mui/material';
import { useState } from 'react';
import { RestoreOrderModal } from './RestoreOrderModal';

interface RestoreOrderButtonProps {
  // 未選択（null）のときはボタンを無効にする
  id: string | null;
}

export const RestoreOrderButton = ({ id }: RestoreOrderButtonProps) => {
  const restoreOrder = useOrderStore((state) => state.restoreOrder);

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        disabled={id === null}
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
