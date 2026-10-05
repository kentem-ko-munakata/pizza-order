import { useOrderStore } from '@/entities/order/model/orderStore';
import { OrderList } from '@/widgets/order-list';

export const MainPage = () => {
  const orders = useOrderStore((state) => state.orders);
  return (
    <div>
      <h1>ピザ注文システム</h1>
      {/* 操作ボタン系 */}
      {/* 注文一覧 */}
      {orders.length === 0 ? <p>注文無し</p> : <OrderList orders={orders} />}
      {/* 合計表示 */}
    </div>
  );
};
