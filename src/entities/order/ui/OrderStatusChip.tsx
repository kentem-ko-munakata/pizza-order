import { Chip } from '@mui/material';

interface OrderStatusChipProps {
  status: boolean;
}

export const OrderStatusChip = ({ status }: OrderStatusChipProps) => {
  return status ? <Chip label='キャンセル済み' size='small' /> : <Chip label='注文済み' color='primary' size='small' />;
};
