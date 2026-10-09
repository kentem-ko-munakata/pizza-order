import { pizzaData } from '@/entities/pizza/model/pizzaData';
import { toppingData } from '@/entities/topping/model/toppingData';
import { useOrderForm, type OrderFormSave,type OrderFormValues } from '../model/useOrderForm';
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

interface OrderFormModalProps {
  title: string;
  submitLabel: string;
  initialValues?: OrderFormValues;
  onClose: () => void;
  onSave: OrderFormSave;
}

// 開いている間だけ描画する前提（開くたびに initialValues から入力が始まる）
export const OrderFormModal = ({ title, submitLabel, initialValues, onClose, onSave }: OrderFormModalProps) => {
  const {
    error,
    handlePizzaChange,
    handleSubmit,
    handleToppingChange,
    isDefaultTopping,
    pizzaId,
    selectedPizza,
    toppingIds,
    totalPrice,
  } = useOrderForm({ initialValues, onClose, onSave });

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth error={Boolean(error)}>
              <InputLabel id='order-form-pizza-label'>ピザ</InputLabel>
              <Select
                value={pizzaId}
                labelId='order-form-pizza-label'
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
                    const isDefault = isDefaultTopping(topping.id);

                    return (
                      <TableRow key={topping.id}>
                        <TableCell padding='checkbox'>
                          <Checkbox
                            size='small'
                            checked={toppingIds.includes(topping.id)}
                            // ピザが未選択 or デフォルトトッピングのものは無効化
                            disabled={!selectedPizza || isDefault}
                            onChange={(event) => handleToppingChange(topping.id, event.target.checked)}
                          />
                        </TableCell>
                        <TableCell>{topping.name}</TableCell>
                        <TableCell>¥{(isDefault ? 0 : topping.price).toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </FormControl>
            <Typography variant='h6'>合計: ¥{totalPrice.toLocaleString()}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <Button type='submit' variant='contained'>
            {submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
