import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { Product } from "../types/product";


export const useCartActions = () => {
  const cartCtx = useContext(CartContext);

  const addProductToCart = (product: Product, quantity = 1) => {
    cartCtx?.addItem({ product, quantity });
  };

  const isInCart = (productId: number) => {
    return !!cartCtx?.items.find((item) => item.product.id === productId);
  };

  return { addProductToCart, isInCart };
};
