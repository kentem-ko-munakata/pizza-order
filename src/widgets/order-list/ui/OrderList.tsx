import { OrderStatusChip, type Order, type OrderTopping } from '@/entities/order';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface OrderListProps {
  orders: Order[];
  orderToppings: OrderTopping[];
  // 選択状態は親（MainPage）が持つ
  selectedOrderId: string | null;
  onSelectOrder: (id: string) => void;
}

export const OrderList = ({ orders, orderToppings, selectedOrderId, onSelectOrder }: OrderListProps) => {
  const selectedOrder = orders.find((order) => order.id === selectedOrderId);
  const selectedOrderToppings = orderToppings.filter((topping) => topping.orderId === selectedOrder?.id);

  return (
    <Stack direction='row' spacing={2}>
      <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant='h6' component='h2'>
          注文一覧
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>名称</TableCell>
                <TableCell>注文状況</TableCell>
                <TableCell>小計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>注文がありません</TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    selected={order.id === selectedOrder?.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onSelectOrder(order.id)}
                  >
                    <TableCell>{order.pizzaName}</TableCell>
                    {/* ステータス状況 */}

                    <TableCell>
                      <OrderStatusChip status={order.isCancel} />
                    </TableCell>
                    <TableCell>¥{order.totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant='h6' component='h2'>
          詳細
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>名称</TableCell>
                <TableCell>値段</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!selectedOrder ? (
                <TableRow>
                  <TableCell colSpan={2}>注文を選択してください</TableCell>
                </TableRow>
              ) : (
                <>
                  {/* ピザ料金表示 */}
                  <TableRow>
                    <TableCell>{selectedOrder.pizzaName}</TableCell>
                    <TableCell>¥{selectedOrder.pizzaPrice.toLocaleString()}</TableCell>
                  </TableRow>
                  {/* トッピング料金表示 */}
                  {selectedOrderToppings.map((topping) => (
                    <TableRow key={topping.id}>
                      <TableCell>{topping.toppingName}</TableCell>
                      <TableCell>¥{topping.toppingPrice.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
};
