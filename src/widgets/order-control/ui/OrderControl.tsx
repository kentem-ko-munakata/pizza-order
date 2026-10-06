import { Button, Stack } from '@mui/material';
import { AddButton } from '@/features/add-order';

export const OrderControl = () => {
  return (
    <Stack direction='row' spacing={2}>
      <AddButton />
      <Button>変更</Button>
      <Button>取消</Button>
      <Button>復元</Button>
    </Stack>
  );
};
