import React, { useCallback, useMemo, useReducer } from "react";

export const FavouritesContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

type Props = {
  children: React.ReactNode;
};

function favouritesReducer(state, action) {
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
      (item) => item.id === action.id
    );

    const existingFavouritesItem = state.items[existingFavouritesItemIndex];

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

  const addItem = useCallback((item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }, []);

  const removeItem = useCallback((id) => {
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
