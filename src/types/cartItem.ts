import { Product } from "./product";

export type CartItemType = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItemType[];
};

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItemType }
  | { type: "REMOVE_ITEM"; id: number };

export type CartContextType = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: number) => void;
};
