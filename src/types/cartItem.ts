export type CartItemType = {
  id: string;
  name: string;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  fullPrice: number;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItemType[];
};

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItemType }
  | { type: "REMOVE_ITEM"; id: string };

export type CartContextType = {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
};
