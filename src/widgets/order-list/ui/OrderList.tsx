import type { Order, OrderTopping } from '@/entities/order';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface OrderListProps {
  orders: Order[];
  orderToppings: OrderTopping[];
}

export const OrderList = ({ orders, orderToppings }: OrderListProps) => {
  return (
    <Stack direction='row' spacing={2}>
      {/* 注文一覧 */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
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
                <TableRow key={order.id}>
                  <TableCell>{order.pizzaName}</TableCell>
                  <TableCell>{order.pizzaPrice}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 詳細 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>値段</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderToppings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>トッピングがありません</TableCell>
              </TableRow>
            ) : (
              orderToppings.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.toppingName}</TableCell>
                  <TableCell>{order.toppingPrice}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
