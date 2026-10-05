import type { Pizza } from './pizza';

// トッピングID
// [
//   "Cheese",
//   "Fried Garlic",
//   "Mozzarella",
//   "Seafood Mix",
//   "Scallops",
//   "Basil",
//   "Tomato",
//   "Tuna",
//   "Corn",
//   "Bacon",
// ]
// ピザ一覧データ
export const pizzaData: Pizza[] = [
  {
    id: 'plain',
    name: 'プレーン',
    price: 1200,
    toppings: ['cheese', 'tomato'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'margherita',
    name: 'マルゲリータ',
    price: 1500,
    toppings: ['cheese', 'tomato', 'mozzarella', 'basil'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'seafood',
    name: 'シーフード',
    price: 1400,
    toppings: ['cheese', 'seafood-mix'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pescatore',
    name: 'ペスカトーレ',
    price: 1800,
    toppings: ['cheese', 'seafood-mix', 'scallops'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'bambino',
    name: 'バンビーノ',
    price: 1600,
    toppings: ['cheese', 'tomato', 'tuna', 'corn', 'bacon'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
