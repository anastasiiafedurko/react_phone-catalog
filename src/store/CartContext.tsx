import React, { useCallback, useMemo, useReducer, useState } from "react";

export const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

type Props = {
  children: React.ReactNode;
};

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
