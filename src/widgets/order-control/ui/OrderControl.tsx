import { Button, Stack } from '@mui/material';

interface OrderControlProps {
  onAddOrder: () => void;
}

export const OrderControl = ({ onAddOrder }: OrderControlProps) => {
  return (
    <Stack direction='row' spacing={2}>
      <Button onClick={onAddOrder}>追加</Button>
      <Button>変更</Button>
      <Button>取消</Button>
      <Button>復元</Button>
    </Stack>
  );
};
