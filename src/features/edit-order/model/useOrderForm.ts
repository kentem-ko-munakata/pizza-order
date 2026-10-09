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

export type OrderFormSave =(order: OrderInput, toppings: OrderFormTopping[]) => void;

interface UseOrderFormProps {
  // 変更時は既存の注文の値、追加時は未指定（空のフォーム）
  initialValues?: OrderFormValues;
  onClose: () => void;
  onSave: OrderFormSave;
}

export const useOrderForm = ({ initialValues, onClose, onSave }: UseOrderFormProps) => {
  const [pizzaId, setPizzaId] = useState(initialValues?.pizzaId ?? '');
  const [toppingIds, setToppingIds] = useState<string[]>(initialValues?.toppingIds ?? []);
  const [error, setError] = useState('');
  const selectedPizza = pizzaData.find((pizza) => pizza.id === pizzaId);

  // 選択中のピザに含まれるデフォルトトッピングか
  const isDefaultTopping = (toppingId: string) => selectedPizza?.toppings.includes(toppingId) ?? false;

  // 選択中のトッピング（デフォルトトッピングは0円）
  const selectedToppings: OrderFormTopping[] = toppingData
    .filter((topping) => toppingIds.includes(topping.id))
    .map((topping) => ({
      toppingId: topping.id,
      // スナップショット
      toppingName: topping.name,
      toppingPrice: isDefaultTopping(topping.id) ? 0 : topping.price,
    }));

  // ピザ料金 + 追加トッピング料金
  const totalPrice = (selectedPizza?.price ?? 0) + selectedToppings.reduce((total, topping) => total + topping.toppingPrice, 0);

  const handlePizzaChange = (nextPizzaId: string) => {
    const nextPizza = pizzaData.find((pizza) => pizza.id === nextPizzaId);
    setPizzaId(nextPizzaId);
    // ピザのデフォルトトッピングを配列にセット
    setToppingIds(nextPizza?.toppings ?? []);
    setError('');
  };

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    // ピザ未選択 or 選択済みピザのデフォルトトッピングの場合
    if (!selectedPizza || isDefaultTopping(toppingId)) {
      return;
    }

    // チェック有 → 追加
    // チェック無 → 指定IDを除く
    setToppingIds((currentIds) => (checked ? [...currentIds, toppingId] : currentIds.filter((id) => id !== toppingId)));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPizza) {
      setError('ピザを選択してください');
      return;
    }

    onSave(
      {
        pizzaId: selectedPizza.id,
        // スナップショット
        pizzaName: selectedPizza.name,
        pizzaPrice: selectedPizza.price,
        totalPrice,
      },
      selectedToppings,
    );
    onClose();
  };

  return {
    error,
    handlePizzaChange,
    handleSubmit,
    handleToppingChange,
    isDefaultTopping,
    pizzaId,
    selectedPizza,
    toppingIds,
    totalPrice,
  };
};
