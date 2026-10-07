import type { Order } from '@/entities/order';
import { Stack } from '@mui/material';
import { AddButton, UpdateButton } from '@/features/edit-order';
import { CancelOrderButton } from '@/features/cancel-order';
import { RestoreOrderButton } from '@/features/restore-order';

interface OrderControlProps {
  selectedOrder: Order | null;
}

export const OrderControl = ({ selectedOrder }: OrderControlProps) => {
  return (
    <Stack direction='row' spacing={2}>
      <AddButton />
      <UpdateButton order={selectedOrder} />
      <CancelOrderButton order={selectedOrder} />
      <RestoreOrderButton order={selectedOrder} />
    </Stack>
  );
};
