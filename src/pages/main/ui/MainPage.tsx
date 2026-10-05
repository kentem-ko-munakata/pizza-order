import { useOrderStore } from '@/entities/order/index';
import { useOrderToppingStore } from '@/entities/order/index';
import { AddOrderFormModal } from '@/features/add-order';
import { OrderControl } from '@/widgets/order-control/ui/OrderControl';
import { OrderList } from '@/widgets/order-list';
import { Container, Stack } from '@mui/material';
import { useState } from 'react';

export const MainPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const addOrder = useOrderStore((state) => state.addOrder);
  const orderToppings = useOrderToppingStore((state) => state.orderToppings);
  const addOrderTopping = useOrderToppingStore((state) => state.addOrderTopping);

  // 注文追加モーダル開閉用
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  return (
    <Container>
      <Stack spacing={2}>
        <h1>ピザ注文システム</h1>
        {/* 操作ボタン系 */}
        <OrderControl onAddOrder={() => setIsAddOrderModalOpen(true)} />
        {/* 注文一覧 */}
        <OrderList orders={orders} orderToppings={orderToppings} />
        {/* 合計表示 */}
      </Stack>
      {/* 注文追加モーダル */}
      <AddOrderFormModal
        open={isAddOrderModalOpen}
        onClose={() => setIsAddOrderModalOpen(false)}
        onSubmitOrder={addOrder}
        onSubmitTopping={addOrderTopping}
      />
    </Container>
  );
};
