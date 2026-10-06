import { useOrderStore } from '@/entities/order/index';
import { useOrderToppingStore } from '@/entities/order/index';
import { OrderControl } from '@/widgets/order-control/ui/OrderControl';
import { OrderList } from '@/widgets/order-list';
import { Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const MainPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const orderToppings = useOrderToppingStore((state) => state.orderToppings);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  // 未選択（または選択中の注文が消えた）場合は先頭の注文を選択扱いにする
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? orders[0];

  return (
    <Container maxWidth='lg'>
      <Stack spacing={2}>
        <Typography variant='h4' component='h1'>
          ピザ注文システム
        </Typography>
        {/* 操作ボタン系 */}
        <OrderControl selectedOrder={selectedOrder ?? null} />
        {/* 注文一覧 */}
        <OrderList
          orders={orders}
          orderToppings={orderToppings}
          selectedOrderId={selectedOrder?.id ?? null}
          onSelectOrder={setSelectedOrderId}
        />
        {/* 合計表示 */}
        <Stack sx={{ alignItems: 'end' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            合計：¥
            {orders.reduce((total, order) => (order.isCancel ? total : total + order.totalPrice), 0).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};
