import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, House } from "lucide-react";

const titlesMap: Record<string, string> = {
  phones: "Phones",
  tablets: "Tablets",
  accessories: "Accessories",
  favourites: "Favourites",
  cart: "Cart",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter(Boolean);

  if (location.pathname === "/") {
    return null;
  }

  if (location.pathname === "/cart") {
    return (
      <div className="mb-4 pt-5">
        <button
          onClick={() => navigate(-1)}
          className="text-secondary hover:text-primary text-sm"
        >
          <span className="flex items-center gap-1 text-secondary ">
            <ChevronLeft size={16} />
            <span className="hover:text-primary">Back</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <nav className="text-sm text-secondary mb-4 pt-5">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-primary text-secondary">
            <House />
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const label = titlesMap[segment] || decodeURIComponent(segment);
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routeTo} className="flex items-center">
              <ChevronRight size={16} className="mx-2 text-secondary" />
              {isLast ? (
                <span className="text-gray-700">{label}</span>
              ) : (
                <Link to={routeTo} className="hover:text-primary">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
