import { NavBar } from "../NavBar";
import { ShoppingBag } from "lucide-react";
import { Heart } from "lucide-react";
import { useContext, useState } from "react";
import { NavbarMenu } from "../NavBar/data";
import { NavLink } from "react-router";
import { CartContext } from "../../store/CartContext";
import { FavouritesContext } from "../../store/FavouritesContext";
import { CartItemType } from "../../types/cartItem";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const count = 3;

  const cartCtx = useContext(CartContext);
  const favouritesCtx = useContext(FavouritesContext);

  const totalCartItems = cartCtx?.items.reduce(
    (totalNumberOfItems, item: CartItemType) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );

  const totalFavouritesItems = favouritesCtx?.items.length;

  return (
    <header className="w-full border-b shadow-md bg-white">
      <div className="flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold flex flex-col leading-tight">
          <a href="#">
            {/* <img src="../../../public/img/logo.png" className="w-20 h-15" /> */}
            <img
              src={`${import.meta.env.BASE_URL}img/logo.png`}
              className="w-20 h-15"
              alt="Logo"
            />
          </a>
        </div>
        <NavBar />
        {/* Icons */}
        <div className="hidden md:flex space-x-4">
          <NavLink to={"/favourites"}>
            <button className="relative inline-flex items-center p-3 text-sm font-medium text-center">
              <Heart />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-almost-red border-2 border-white rounded-full -top-0 -end-0 dark:border-wite-900">
                {totalFavouritesItems}
              </div>
            </button>
          </NavLink>

          <NavLink to={"/cart"}>
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center"
            >
              <ShoppingBag />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-almost-red border-2 border-white rounded-full -top-0 -end-0 dark:border-wite-900">
                {totalCartItems}
              </div>
            </button>
          </NavLink>
        </div>
        {/* Burger menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="fixed inset-y-0 right-0 w-full bg-white ">
            <div className="flex items-center justify-between px-6 py-4 border shadow-md">
              {/* Logo */}
              <div className="text-xl font-bold flex flex-col leading-tight">
                <a href="#">
                  <img
                    src="../../../public/img/logo.png"
                    className="w-20 h-15"
                  />
                </a>
              </div>
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Menu Items */}
            <div className="mt-10">
              <nav className="font-semibold">
                <ul className="flex flex-col items-center gap-4 text-gray-600">
                  {NavbarMenu.map((item) => {
                    return (
                      <li key={item.id}>
                        <a
                          href={item.link}
                          className="relative block py-3 px-3 font-mont-semibold font-[800] text-[12px] leading-[11px] tracking-[4%] uppercase hover:text-primary
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 after:transition-transform after:duration-300 after:-my-0 hover:after:scale-x-90"
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Icons */}
            <div className="absolute bottom-6 left-0 w-full flex justify-center space-x-40">
              <button className="relative inline-flex items-center p-3 text-sm font-medium text-center">
                <Heart />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-almost-red border-2 border-white rounded-full -top-0 -end-0 dark:border-wite-900">
                  {count}
                </div>
              </button>
              <NavLink to={"/cart"}>
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center"
                >
                  <ShoppingBag />
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-almost-red border-2 border-white rounded-full -top-0 -end-0 dark:border-wite-900">
                    {count}
                  </div>
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
