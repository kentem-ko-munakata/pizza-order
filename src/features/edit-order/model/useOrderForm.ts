import type { OrderInput, OrderToppingInput } from '@/entities/order';
import { pizzaData } from '@/entities/pizza/model/pizzaData';
import { toppingData } from '@/entities/topping/model/toppingData';
import { useState, type FormEvent } from 'react';

// 注文に紐づくトッピング（orderId は保存側で付与する）
export type OrderFormTopping = Omit<OrderToppingInput, 'orderId'>;

export interface OrderFormValues {
  pizzaId: string;
  toppingIds: string[];
}

export type OrderFormSubmit = (order: OrderInput, toppings: OrderFormTopping[]) => void;

interface UseOrderFormProps {
  // 変更時は既存の注文の値、追加時は未指定（空のフォーム）
  initialValues?: OrderFormValues;
  onClose: () => void;
  onSubmit: OrderFormSubmit;
}

export const useOrderForm = ({ initialValues, onClose, onSubmit }: UseOrderFormProps) => {
  const [pizzaId, setPizzaId] = useState(initialValues?.pizzaId ?? '');
  const [toppingIds, setToppingIds] = useState<string[]>(initialValues?.toppingIds ?? []);
  const [error, setError] = useState('');
  const selectedPizza = pizzaData.find((pizza) => pizza.id === pizzaId);

  // ピザに含まれるデフォルトトッピングは追加料金に含めない
  const toppingTotal = toppingData
    .filter((topping) => toppingIds.includes(topping.id) && !selectedPizza?.toppings.includes(topping.id))
    .reduce((total, topping) => total + topping.price, 0);

  const handlePizzaChange = (pizzaId: string) => {
    const pizza = pizzaData.find((pizza) => pizza.id === pizzaId);
    setPizzaId(pizzaId);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pizza = pizzaData.find((item) => item.id === pizzaId);
    if (!pizza) {
      setError('ピザを選択してください');
      return;
    }

    // toppingIdsのトッピングデータを取得
    const selectedToppings = toppingData.filter((topping) => toppingIds.includes(topping.id));

    // トッピング（デフォルトトッピングは0円）
    const toppings = selectedToppings.map((topping) => ({
      toppingId: topping.id,
      // スナップショット
      toppingName: topping.name,
      toppingPrice: pizza.toppings.includes(topping.id) ? 0 : topping.price,
    }));

    onSubmit(
      {
        pizzaId: pizza.id,
        // スナップショット
        pizzaName: pizza.name,
        pizzaPrice: pizza.price,
        // ピザ料金 + 追加トッピング料金
        totalPrice: pizza.price + toppings.reduce((total, topping) => total + topping.toppingPrice, 0),
      },
      toppings,
    );
    onClose();
  };

  return {
    error,
    handlePizzaChange,
    handleSubmit,
    handleToppingChange,
    pizzaId,
    selectedPizza,
    toppingIds,
    toppingTotal,
  };
};
