import { useOrderStore, useOrderToppingStore, calcTotalPrice } from '@/entities/order/index';
import { OrderControl } from '@/widgets/order-control';
import { OrderList } from '@/widgets/order-list';
import { Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const MainPage = () => {
  // 注文一覧
  const orders = useOrderStore((state) => state.orders);
  // 注文に紐づくトッピング一覧
  const orderToppings = useOrderToppingStore((state) => state.orderToppings);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  // 未選択（または選択中の注文が消えた）場合は null
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? null;

  const totalPrice = calcTotalPrice(orders);

  return (
    <Container maxWidth='lg'>
      <Stack spacing={2}>
        <Typography variant='h4' component='h1'>
          ピザ注文システム
        </Typography>
        {/* 操作ボタン系 */}
        <OrderControl selectedOrder={selectedOrder} />
        {/* 注文一覧 */}
        <OrderList
          orders={orders}
          orderToppings={orderToppings}
          selectedOrder={selectedOrder}
          onSelectOrder={setSelectedOrderId}
        />
        {/* 合計表示 */}
        <Stack sx={{ alignItems: 'end' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            合計：¥
            {totalPrice.toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};
