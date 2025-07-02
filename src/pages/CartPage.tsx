import { useContext } from "react";
import { CartItem } from "../components/CartItem";
import { CartContext } from "../store/CartContext";

import { Product } from "../types/product";

export const CartPage = () => {
  const ctxCart = useContext(CartContext);

  const totalPrice = ctxCart?.items.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    0
  );

  const handlePlusItem = (product: Product<unknown>) => {
    ctxCart?.addItem({
      product,
      quantity: 1,
    });
  };

  const handleMinusItem = (product: Product<unknown>) => {
    ctxCart?.removeItem(product.id);
  };

  return (
    <>
      <h1 className="text-4xl font-mont-bold text-primary my-14">Cart</h1>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-col gap-4 w-full">
          {ctxCart?.items.map((item) => (
            <CartItem
              id={item.product.itemId}
              name={item.product.name}
              image={item.product.image}
              price={item.product.price * item.quantity}
              quantity={item.quantity}
              key={item.product.id}
              onPlus={() => handlePlusItem(item.product)}
              onMinus={() => handleMinusItem(item.product)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 border px-4 py-8 md:w-[300px] self-start">
          <p className="price font-mont-semibold text-primary text-2xl">
            ${totalPrice}
          </p>
          <p className="text-sm text-secondary">
            Total for {ctxCart?.items.length} items
          </p>
          <hr className="mb-2" />
          <button
            type="button"
            className="rounded-none h-[40px] w-full font-mont border border-primary text-white text-xs md:text-sm whitespace-nowrap bg-primary active:bg-white active:text-almost-green active:border active:border-secondary"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
