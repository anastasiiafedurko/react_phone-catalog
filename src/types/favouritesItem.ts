import { Accessory } from "./accessory";
import { Phone } from "./phone";
import { Product } from "./product";
import { Tablet } from "./tablet";

export type FavouritesItemType =
  | Product<Phone>
  | Product<Tablet>
  | Product<Accessory>;

export type FavouritesState = {
  items: FavouritesItemType[];
};

export type FavouritesAction =
  | { type: "ADD_ITEM"; item: FavouritesItemType }
  | { type: "REMOVE_ITEM"; id: string };

export type FavouritesContextType = {
  items: FavouritesItemType[];
  addItem: (item: FavouritesItemType) => void;
  removeItem: (id: string) => void;
};
