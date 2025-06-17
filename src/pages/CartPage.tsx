import { useContext } from "react";
import { CartItem } from "../components/CartItem";
import { CartContext } from "../store/CartContext";

export const CartPage = () => {
  const ctxCart = useContext(CartContext);

  return (
    <>
      <h1 className="text-4xl font-mont-bold text-primary my-14">Cart</h1>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-col gap-4 w-full">
          {ctxCart?.items.map((item) => (
            <CartItem
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price * item.quantity}
              quantity={item.quantity}
              key={item.id}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 border px-4 py-8 md:w-[300px] self-start">
          <p className="price font-mont-semibold text-primary text-2xl">
            $1234
          </p>
          <p className="text-sm text-secondary">Total for 3 items</p>
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
