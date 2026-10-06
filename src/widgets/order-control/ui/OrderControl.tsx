import { Button, Stack } from '@mui/material';
import { AddButton } from '@/features/add-order';
import { CancelOrderButton } from '@/features/cancel-order';

interface OrderControlProps {
  selectedOrderId: string | null;
}

export const OrderControl = ({ selectedOrderId }: OrderControlProps) => {
  return (
    <Stack direction='row' spacing={2}>
      <AddButton />
      <Button disabled={selectedOrderId === null}>変更</Button>
      <CancelOrderButton id={selectedOrderId} />
      <Button disabled={selectedOrderId === null}>復元</Button>
    </Stack>
  );
};
