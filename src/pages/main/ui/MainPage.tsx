import { useOrderStore } from '@/entities/order/index';
import { useOrderToppingStore } from '@/entities/order/index';
import { OrderControl } from '@/widgets/order-control/ui/OrderControl';
import { OrderList } from '@/widgets/order-list';
import { Container, Stack, Typography } from '@mui/material';

export const MainPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const orderToppings = useOrderToppingStore((state) => state.orderToppings);

  return (
    <Container maxWidth='lg'>
      <Stack spacing={2}>
        <Typography variant='h4' component='h1'>
          ピザ注文システム
        </Typography>
        {/* 操作ボタン系 */}
        <OrderControl />
        {/* 注文一覧 */}
        <OrderList orders={orders} orderToppings={orderToppings} />
        {/* 合計表示 */}
        <Stack sx={{ alignItems: 'end' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            合計：¥{orders.reduce((total, order) => total + order.totalPrice, 0).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};
