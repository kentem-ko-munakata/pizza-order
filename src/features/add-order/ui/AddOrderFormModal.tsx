import type { OrderInput, OrderToppingInput } from '@/entities/order';
import { pizzaData } from '@/entities/pizza/model/pizzaData';
import { toppingData } from '@/entities/topping/model/toppingData';
import { useAddOrderForm } from '../model/useAddOrderForm';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface AddOrderFormModalProps {
  open: boolean;
  onClose: () => void;
  // 注文本体と、その注文に紐づくトッピングを保存する処理。
  onSubmitOrder: (input: OrderInput) => string;
  onSubmitTopping: (input: OrderToppingInput) => void;
}

export const AddOrderFormModal = ({ open, onClose, onSubmitOrder, onSubmitTopping }: AddOrderFormModalProps) => {
  const {
    error,
    handleClose,
    handlePizzaChange,
    handleSubmitOrder,
    handleToppingChange,
    pizzaId,
    selectedPizza,
    toppingIds,
    toppingTotal,
  } = useAddOrderForm({ onClose, onSubmitOrder, onSubmitTopping });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <form onSubmit={handleSubmitOrder}>
        <DialogTitle>注文を追加</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth error={Boolean(error)}>
              <InputLabel id='add-order-pizza-label'>ピザ</InputLabel>
              <Select
                value={pizzaId}
                labelId='add-order-pizza-label'
                label='ピザ'
                onChange={(event) => handlePizzaChange(event.target.value)}
              >
                {pizzaData.map((pizza) => (
                  <MenuItem key={pizza.id} value={pizza.id}>
                    {pizza.name}（¥{pizza.price.toLocaleString()}）
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>

            {/* ピザを選ぶまではトッピング欄を無効にする。 */}
            <FormControl component='fieldset' disabled={!selectedPizza}>
              <Typography component='legend' variant='subtitle1'>
                トッピング
              </Typography>
              <Table size='small' aria-label='トッピング選択' component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell padding='checkbox' />
                    <TableCell>名称</TableCell>
                    <TableCell>価格</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toppingData.map((topping) => {
                    // デフォルトトッピング判定
                    const isDefaultTopping = selectedPizza?.toppings.includes(topping.id) ?? false;

                    return (
                      <TableRow key={topping.id}>
                        <TableCell padding='checkbox'>
                          <Checkbox
                            size='small'
                            checked={toppingIds.includes(topping.id)}
                            // ピザが未選択 or デフォルトトッピングのものは無効化
                            disabled={!selectedPizza || isDefaultTopping}
                            onChange={(event) => handleToppingChange(topping.id, event.target.checked)}
                          />
                        </TableCell>
                        <TableCell>{topping.name}</TableCell>
                        <TableCell>¥{(isDefaultTopping ? 0 : topping.price).toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </FormControl>
            {/* ピザの価格に、選択したトッピングの合計額を加えて表示する。 */}
            <Typography variant='h6'>合計: ¥{((selectedPizza?.price ?? 0) + toppingTotal).toLocaleString()}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* キャンセル時も送信後と同じく、入力を初期化してダイアログを閉じる。 */}
          <Button onClick={handleClose}>キャンセル</Button>
          <Button type='submit' variant='contained'>
            注文を追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
