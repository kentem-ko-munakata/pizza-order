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
import { Controller } from 'react-hook-form';

interface AddOrderFormModalProps {
  // ダイアログの表示状態と、閉じるときの処理。
  open: boolean;
  onClose: () => void;
  // 注文本体と、その注文に紐づくトッピングを保存する処理。
  onSubmitOrder: (input: OrderInput) => string;
  onSubmitTopping: (input: OrderToppingInput) => void;
}

// 注文追加ダイアログ。表示と入力部品の配置を担当し、フォーム処理はカスタムフックに任せる。
export const AddOrderFormModal = ({ open, onClose, onSubmitOrder, onSubmitTopping }: AddOrderFormModalProps) => {
  const {
    control,
    formState,
    handleClose,
    handlePizzaChange,
    handleSubmitOrder,
    handleToppingChange,
    selectedPizza,
    toppingTotal,
  } = useAddOrderForm({ onClose, onSubmitOrder, onSubmitTopping });

  return (
    /* ダイアログを閉じるときは、フックの handleClose でフォームも初期化する。 */
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      {/* 送信時は react-hook-form が入力値をまとめ、フックの登録処理を呼び出す。 */}
      <form onSubmit={handleSubmitOrder}>
        <DialogTitle>注文を追加</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {/* Controller が MUI の Select とフォームの pizzaId を同期する。 */}
            <Controller
              name='pizzaId'
              control={control}
              rules={{ required: 'ピザを選択してください' }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={Boolean(fieldState.error)}>
                  <InputLabel id='add-order-pizza-label'>ピザ</InputLabel>
                  {/* 選んだピザIDをフックに渡し、ピザと標準トッピングの状態を更新する。 */}
                  <Select
                    {...field}
                    labelId='add-order-pizza-label'
                    label='ピザ'
                    onChange={(event) => handlePizzaChange(event.target.value)}
                  >
                    {/* 選択肢にはピザ名と価格を表示し、値としてピザIDを使う。 */}
                    {pizzaData.map((pizza) => (
                      <MenuItem key={pizza.id} value={pizza.id}>
                        {pizza.name}（¥{pizza.price.toLocaleString()}）
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* ピザを選ぶまではトッピング欄を無効にする。 */}
            <FormControl component='fieldset' disabled={!selectedPizza}>
              <Typography component='legend' variant='subtitle1'>
                トッピング
              </Typography>
              {/* Controller がチェックボックス一覧とフォームの toppingIds を同期する。 */}
              <Controller
                name='toppingIds'
                control={control}
                render={({ field }) => (
                  <Table size='small' aria-label='トッピング選択' component={Paper}>
                    <TableHead>
                      <TableRow>
                        {/* 選択欄は見出しなしにして、名称と価格を表示する。 */}
                        <TableCell padding='checkbox' />
                        <TableCell>名称</TableCell>
                        <TableCell>価格</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {toppingData.map((topping) => {
                        // ピザに含まれる標準トッピングは選択済みで固定する。
                        const isDefaultTopping = selectedPizza?.toppings.includes(topping.id) ?? false;
                        const isChecked = field.value.includes(topping.id);

                        return (
                          <TableRow key={topping.id}>
                            <TableCell padding='checkbox'>
                              {/* ピザ未選択時と標準トッピングではチェックを変更できない。 */}
                              <Checkbox
                                size='small'
                                checked={isChecked}
                                disabled={!selectedPizza || isDefaultTopping}
                                onChange={(event) => handleToppingChange(topping.id, event.target.checked)}
                              />
                            </TableCell>
                            <TableCell>{topping.name}</TableCell>
                            <TableCell>¥{topping.price.toLocaleString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              />
            </FormControl>
            {/* ピザの価格に、選択したトッピングの合計額を加えて表示する。 */}
            <Typography variant='h6'>
              合計: ¥{((selectedPizza?.price ?? 0) + toppingTotal).toLocaleString()}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* キャンセル時も送信後と同じく、入力を初期化してダイアログを閉じる。 */}
          <Button onClick={handleClose}>キャンセル</Button>
          {/* 送信処理中はボタンを無効にして、二重送信を防ぐ。 */}
          <Button type='submit' variant='contained' disabled={formState.isSubmitting}>
            注文を追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
