import { useContext } from "react";
import { Product } from "../types/product";
import { FavouritesContext } from "../store/FavouritesContext";

export const useFavouritesActions = () => {
  const favouritesCtx = useContext(FavouritesContext);

  const isInFavourites = (productId: number) => {
    return !!favouritesCtx?.items.find((item) => item.product.id === productId);
  };

  const addProductToFavourites = (product: Product) => {
    isInFavourites(product.id)
      ? favouritesCtx?.removeItem(product.id)
      : favouritesCtx?.addItem({
          product,
        });
  };

  return { addProductToFavourites, isInFavourites };
};
