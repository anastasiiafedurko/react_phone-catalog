import { NavLink } from "react-router";
import "./NavBar.scss";

import { NavbarMenu } from "./data";
import classNames from "classnames";

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(
    "relative inline-block py-1 px-3 font-mont-semibold font-[800] text-[12px] leading-[11px] tracking-[4%] uppercase hover:text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-black after:scale-x-0 after:transition-transform after:duration-300 after:-my-8 hover:after:scale-x-90",
    {
      "text-primary": isActive,
    }
  );

export const NavBar = () => {
  return (
    <>
      <nav className="hidden md:flex space-x-6 font-semibold">
        <ul className="flex items-center gap-6 text-gray-600">
          {NavbarMenu.map((item) => {
            return (
              <li key={item.id}>
                <NavLink to={item.title} className={getLinkClass}>
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
