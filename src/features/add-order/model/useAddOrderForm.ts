import type { OrderInput, OrderToppingInput } from '@/entities/order';
import { pizzaData } from '@/entities/pizza/model/pizzaData';
import { toppingData } from '@/entities/topping/model/toppingData';
import { useState, type FormEvent } from 'react';

interface UseAddOrderFormProps {
  onClose: () => void;
  onSubmitOrder: (input: OrderInput) => string;
  onSubmitTopping: (input: OrderToppingInput) => void;
}

export const useAddOrderForm = ({ onClose, onSubmitOrder, onSubmitTopping }: UseAddOrderFormProps) => {
  const [pizzaId, setPizzaId] = useState('');
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [error, setError] = useState('');
  const selectedPizza = pizzaData.find((pizza) => pizza.id === pizzaId);

  // ピザに含まれるデフォルトトッピングは追加料金に含めない
  const toppingTotal = toppingData
    .filter((topping) => toppingIds.includes(topping.id) && !selectedPizza?.toppings.includes(topping.id))
    .reduce((total, topping) => total + topping.price, 0);

  // フォーム初期化
  const reset = () => {
    setPizzaId('');
    setToppingIds([]);
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePizzaChange = (nextPizzaId: string) => {
    const pizza = pizzaData.find((item) => item.id === nextPizzaId);
    setPizzaId(nextPizzaId);
    // ピザのデフォルトトッピングを配列にセット
    setToppingIds(pizza?.toppings ?? []);
    setError('');
  };

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    // ピザ未選択 or 選択済みピザのトッピングと一致する場合
    if (!selectedPizza || selectedPizza.toppings.includes(toppingId)) {
      return;
    }

    // チェック有 → 追加
    // チェック無 → 指定IDを除く
    setToppingIds((currentIds) => (checked ? [...currentIds, toppingId] : currentIds.filter((id) => id !== toppingId)));
  };

  const handleSubmitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pizza = pizzaData.find((item) => item.id === pizzaId);
    if (!pizza) {
      setError('ピザを選択してください');
      return;
    }

    // toppingIdsのトッピングデータを取得
    const selectedToppings = toppingData.filter((topping) => toppingIds.includes(topping.id));

    // ピザ料金 + 追加トッピング料金（デフォルトトッピングは0円）
    const pizzaPrice =
      pizza.price +
      selectedToppings.reduce((total, topping) => total + (pizza.toppings.includes(topping.id) ? 0 : topping.price), 0);

    // 注文登録（orderIdは、トッピング登録時に使用）
    const orderId = onSubmitOrder({
      pizzaId: pizza.id,
      // スナップショット
      pizzaName: pizza.name,
      pizzaPrice: String(pizzaPrice),
    });

    // 注文登録（トッピング）
    selectedToppings.forEach((topping) => {
      onSubmitTopping({
        orderId,
        toppingId: topping.id,
        // スナップショット
        toppingName: topping.name,
        // デフォルトトッピングは0として登録
        toppingPrice: pizza.toppings.includes(topping.id) ? 0 : topping.price,
      });
    });

    handleClose();
  };

  return {
    error,
    handleClose,
    handlePizzaChange,
    handleSubmitOrder,
    handleToppingChange,
    pizzaId,
    selectedPizza,
    toppingIds,
    toppingTotal,
  };
};
