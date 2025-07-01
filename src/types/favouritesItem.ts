import { Product } from "./product";

export type FavouritesItemType = {
  product: Product;
};

export type FavouritesState = {
  items: FavouritesItemType[];
};

export type FavouritesAction =
  | { type: "ADD_ITEM"; item: FavouritesItemType }
  | { type: "REMOVE_ITEM"; id: number };

export type FavouritesContextType = {
  items: FavouritesItemType[];
  addItem: (item: FavouritesItemType) => void;
  removeItem: (id: number) => void;
};
