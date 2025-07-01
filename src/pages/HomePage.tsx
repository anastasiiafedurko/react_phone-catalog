import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useContext, useEffect } from "react";
import { ProductsContext } from "../store/ProductContext";
import { PicturesSlider } from "../components/PicturesSlider";
import { ProductsSlider } from "../components/ProductsSlider";
import { ShopByCategory } from "../components/ShopByCategory";
import { ProductCard } from "../components/ProductCard";

export const HomePage = () => {
  const { newProducts, hotProducts, loadProducts } =
    useContext(ProductsContext);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-mont-bold text-primary my-14">
        Welcome to Nice Gadgets store!
      </h1>

      <PicturesSlider />

      <ProductsSlider title="Brand new models">
        {newProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductsSlider>

      <h1 className="text-4xl font-mont-bold text-primary my-14">
        Shop by category
      </h1>
      <ShopByCategory />

      <ProductsSlider title="Hot prices">
        {hotProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ProductsSlider>
    </>
  );
};
