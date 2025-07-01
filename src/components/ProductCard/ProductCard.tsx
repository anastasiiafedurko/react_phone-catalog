import { Heart } from "lucide-react";
import React, { useContext } from "react";
import { IconButton } from "../ui/IconButton";
import { Link } from "react-router";
import { CartContext } from "../../store/CartContext";
import classNames from "classnames";
import { FavouritesContext } from "../../store/FavouritesContext";
import { Product } from "../../types/product";

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const cartCtx = useContext(CartContext);
  const favouritesCtx = useContext(FavouritesContext);

  const isItemInCart = !!cartCtx?.items.find(
    (item) => item.product.id === product.id
  );
  const isItemInFavourites = !!favouritesCtx?.items.find(
    (item) => item.product.id === product.id
  );

  const handleAddProductToCart = () => {
    cartCtx?.addItem({
      product,
      quantity: 1,
    });
  };

  const handleAddProductToFavourites = () => {
    isItemInFavourites
      ? favouritesCtx?.removeItem(product.id)
      : favouritesCtx?.addItem({
          product,
        });
  };

  return (
    <div className="flex flex-col justify-between w-[212px] md:w-[237px] lg:w-[272px] h-[432px] md:h-[512px] lg:h-[506px] p-8 border shadow-md">
      <Link to={`/product/${product.itemId}`}>
        <img
          src={`../../../../public/${product.image}`}
          className="mb-2 w-[224px] h-[130px] md:w-[223px] md:h-[196px] lg:w-[208px] lg:h-[196px] object-contain"
        />

        <p className="title mb-2 text-sm">{product.name}</p>
      </Link>
      <div className="flex flex-row gap-1">
        <p className="price font-mont-semibold text-primary text-xl">
          ${product.price}
        </p>
        <p className="price font-mont text-secondary line-through text-xl">
          ${product.fullPrice}
        </p>
      </div>
      <hr className="mb-2" />
      <div className="grid grid-rows-3 grid-cols-2 mb-2 text-xs">
        <p className="text-secondary">Screen</p>
        <p className="text-primary text-end">{product.screen}</p>
        <p className="text-secondary">Capacity</p>
        <p className="text-primary text-end">{product.capacity}</p>
        <p className="text-secondary">RAM</p>
        <p className="text-primary text-end">{product.ram}</p>
      </div>

      {/* Buttons at the bottom */}
      <div className="flex flex-row gap-1 mt-auto">
        <button
          type="button"
          className={classNames(
            "flex-auto rounded-none h-[40px] w-auto font-mont border ",

            isItemInCart
              ? "text-almost-green border border-secondary bg-white"
              : "border-primary text-white text-xs md:text-sm whitespace-nowrap bg-primary"
          )}
          onClick={handleAddProductToCart}
        >
          {isItemInCart ? "Added to cart" : "Add to cart"}
        </button>

        {isItemInFavourites ? (
          <IconButton
            icon={<Heart className="#EB5757" fill="#EB5757" stroke="#EB5757" />}
            onClick={handleAddProductToFavourites}
          />
        ) : (
          <IconButton icon={<Heart />} onClick={handleAddProductToFavourites} />
        )}
      </div>
    </div>
  );
};
