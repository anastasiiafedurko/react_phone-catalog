import React, { useCallback, useMemo, useReducer } from "react";
import {
  CartAction,
  CartContextType,
  CartItemType,
  CartState,
} from "../types/cartItem";

export const CartContext = React.createContext<CartContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

function cartReducer(state: CartState, action: CartAction): CartState {
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

    return { items: updatedItems };
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

    return { items: updatedItems };
  }

  return state;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((item: CartItemType) => {
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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
