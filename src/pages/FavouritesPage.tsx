import { useContext } from "react";
import { FavouritesContext } from "../store/FavouritesContext";
import { ProductsList } from "../components/ProductsList/ProductsList";

export const FavouritesPage = () => {
  const favouritesCart = useContext(FavouritesContext);

  return (
    <>
      <h1 className="text-4xl font-mont-bold text-primary my-14">Favourites</h1>

      {favouritesCart && <ProductsList products={favouritesCart.items} />}
    </>
  );
};
