import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { ProductsProvider } from "./store/ProductContext.tsx";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { PhonesPage } from "./pages/ProductsPage.tsx";
import { ProductDetailsPage } from "./pages/ProductDetailsPage.tsx";
import { CartPage } from "./pages/CartPage.tsx";
import { CartProvider } from "./store/CartContext.tsx";
import { FavouritesProvider } from "./store/FavouritesContext.tsx";
import { FavouritesPage } from "./pages/FavouritesPage.tsx";
import { ScrollToTop } from "./utils/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <StrictMode>
      <CartProvider>
        <FavouritesProvider>
          <ProductsProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="home" element={<Navigate to="/" />} />
                <Route path=":category" element={<PhonesPage />} />
                <Route
                  path=":category/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="cart" element={<CartPage />} />
                <Route path="favourites" element={<FavouritesPage />} />
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </ProductsProvider>
        </FavouritesProvider>
      </CartProvider>
    </StrictMode>
  </Router>
);
