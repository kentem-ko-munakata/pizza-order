import type { OrderInput, OrderToppingInput } from '@/entities/order';
import { pizzaData } from '@/entities/pizza/model/pizzaData';
import { toppingData } from '@/entities/topping/model/toppingData';
import { useForm, useWatch } from 'react-hook-form';

interface AddOrderFormValues {
  // 画面では名前を表示するが、フォームではピザ・トッピングのIDを保存する。
  pizzaId: string;
  toppingIds: string[];
}

interface UseAddOrderFormProps {
  // 注文完了またはキャンセル後にダイアログを閉じるための処理。
  onClose: () => void;
  // 注文本体の保存処理。保存された注文のIDを返す。
  onSubmitOrder: (input: OrderInput) => string;
  // 注文IDに紐づくトッピングを保存する処理。
  onSubmitTopping: (input: OrderToppingInput) => void;
}

// フォームの値、選択時のルール、金額計算、注文登録をまとめて管理する。
export const useAddOrderForm = ({ onClose, onSubmitOrder, onSubmitTopping }: UseAddOrderFormProps) => {
  // フォームの初期値を設定し、UIと連携するための control などを用意する。
  const { control, handleSubmit, reset, setError, setValue, formState } = useForm<AddOrderFormValues>({
    defaultValues: { pizzaId: '', toppingIds: [] },
  });

  // 選択値を監視する。値が変わると合計金額や標準トッピングの表示も更新される。
  const pizzaId = useWatch({ control, name: 'pizzaId' });
  const toppingIds = useWatch({ control, name: 'toppingIds' });
  const selectedPizza = pizzaData.find((pizza) => pizza.id === pizzaId);

  // 選択中のトッピング料金を合計する。ピザ本体の価格は画面側で加算する。
  const toppingTotal = toppingData
    .filter((topping) => toppingIds.includes(topping.id))
    .reduce((total, topping) => total + topping.price, 0);

  // キャンセル時は入力値を初期化してから、呼び出し元にダイアログを閉じてもらう。
  const handleClose = () => {
    reset();
    onClose();
  };

  // ピザを切り替えたら、そのピザのIDと標準トッピングをフォームに設定する。
  const handlePizzaChange = (pizzaId: string) => {
    setValue('pizzaId', pizzaId, { shouldDirty: true, shouldValidate: true });
    const pizza = pizzaData.find((item) => item.id === pizzaId);
    setValue('toppingIds', pizza?.toppings ?? []);
  };

  // 標準トッピングは変更させず、それ以外はチェック状態に応じて追加・削除する。
  const handleToppingChange = (toppingId: string, checked: boolean) => {
    // UIでも無効化しているが、処理側でも不正な変更が起きないように確認する。
    if (!selectedPizza || selectedPizza.toppings.includes(toppingId)) {
      return;
    }

    const nextToppingIds = checked ? [...toppingIds, toppingId] : toppingIds.filter((id) => id !== toppingId);
    setValue('toppingIds', nextToppingIds);
  };

  // 入力値から注文を作り、選択したトッピングをその注文に紐づけて保存する。
  const submitOrder = (values: AddOrderFormValues) => {
    const pizza = pizzaData.find((item) => item.id === values.pizzaId);
    if (!pizza) {
      // 念のためピザIDを再確認し、無効な場合はフォームにエラーを表示する。
      setError('pizzaId', { type: 'validate', message: 'ピザを選択してください' });
      return;
    }

    // フォームに保存されたIDから、選択中のトッピング情報を取り出す。
    const selectedToppings = toppingData.filter((topping) => values.toppingIds.includes(topping.id));
    const orderId = onSubmitOrder({
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      // 注文価格にはピザ本体と選択されたトッピングの両方を含める。
      pizzaPrice: String(pizza.price + selectedToppings.reduce((total, topping) => total + topping.price, 0)),
    });

    // 注文の保存で返されたIDを各トッピングに設定し、注文との関連を保つ。
    selectedToppings.forEach((topping) => {
      onSubmitTopping({
        orderId,
        toppingId: topping.id,
        toppingName: topping.name,
        toppingPrice: topping.price,
      });
    });

    // 登録が終わったらフォームを初期化し、ダイアログを閉じる。
    reset();
    onClose();
  };

  // UIに必要な値と操作だけを返す。handleSubmit がフォーム送信と登録処理をつなぐ。
  return {
    control,
    formState,
    handleClose,
    handlePizzaChange,
    handleSubmitOrder: handleSubmit(submitOrder),
    handleToppingChange,
    selectedPizza,
    toppingTotal,
  };
};
