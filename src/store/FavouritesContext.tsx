import React, { useCallback, useMemo, useReducer } from "react";
import {
  FavouritesAction,
  FavouritesContextType,
  FavouritesItemType,
  FavouritesState,
} from "../types/favouritesItem";

export const FavouritesContext = React.createContext<
  FavouritesContextType | undefined
>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

type Props = {
  children: React.ReactNode;
};

function favouritesReducer(state: FavouritesState, action: FavouritesAction) {
  if (action.type === "ADD_ITEM") {
    const existingFavouritesItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existingFavouritesItemIndex === -1) {
      updatedItems.push({ ...action.item });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingFavouritesItemIndex = state.items.findIndex(
      (item) => item.id === Number(action.id)
    );

    const updatedItems = [...state.items];

    updatedItems.splice(existingFavouritesItemIndex, 1);

    return { ...state, items: updatedItems };
  }

  return state;
}

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(favouritesReducer, {
    items: [],
  });

  const addItem = useCallback((item: FavouritesItemType) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }, []);

  const value = useMemo(
    () => ({
      items: cart.items,
      addItem,
      removeItem,
    }),
    [cart.items, addItem, removeItem]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
