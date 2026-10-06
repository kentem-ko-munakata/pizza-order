import type { Order } from '@/entities/order';
import { Button, Stack } from '@mui/material';
import { AddButton } from '@/features/add-order';
import { CancelOrderButton } from '@/features/cancel-order';
import { RestoreOrderButton } from '@/features/restore-order';

interface OrderControlProps {
  selectedOrder: Order | null;
}

export const OrderControl = ({ selectedOrder }: OrderControlProps) => {
  const selectedOrderId = selectedOrder?.id ?? null;

  return (
    <Stack direction='row' spacing={2}>
      <AddButton />
      <Button variant='contained' disabled={selectedOrder === null}>
        変更
      </Button>
      {/* 取消済みの注文は取消できない */}
      <CancelOrderButton id={selectedOrderId} disabled={selectedOrder?.isCancel ?? false} />
      {/* 取消されていない注文は復元できない */}
      <RestoreOrderButton id={selectedOrderId} disabled={!selectedOrder?.isCancel} />
    </Stack>
  );
};
