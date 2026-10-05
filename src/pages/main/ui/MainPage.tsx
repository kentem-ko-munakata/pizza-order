import { useOrderStore } from '@/entities/order/index';
import { useOrderToppingStore } from '@/entities/order/index';
import { OrderList } from '@/widgets/order-list';
import { Container, Stack } from '@mui/material';

export const MainPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const orderToppings = useOrderToppingStore((state) => state.orderToppings);
  return (
    <Container>
      <Stack spacing={2}>
        <h1>ピザ注文システム</h1>
        {/* 操作ボタン系 */}
        {/* 注文一覧 */}
        <OrderList orders={orders} orderToppings={orderToppings} />
        {/* 合計表示 */}
      </Stack>
    </Container>
  );
};
