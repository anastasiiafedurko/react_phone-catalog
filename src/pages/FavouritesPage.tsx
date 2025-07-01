import { useContext } from "react";
import { FavouritesContext } from "../store/FavouritesContext";
import { ProductsList } from "../components/ProductsList/ProductsList";
import { Product } from "../types/product";
import { Phone } from "../types/phone";
import { Tablet } from "../types/tablet";
import { Accessory } from "../types/accessory";

export const FavouritesPage = () => {
  const favouritesCart = useContext(FavouritesContext);

  return (
    <>
      <h1 className="text-4xl font-mont-bold text-primary my-14">Favourites</h1>

      {favouritesCart && (
        <ProductsList
          products={favouritesCart.items.map(
            (item) => item.product as Product<Phone | Tablet | Accessory>
          )}
        />
      )}
    </>
  );
};
