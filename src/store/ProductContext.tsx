import React, { useCallback, useContext, useMemo, useState } from "react";
import { Product } from "../types/product";
import { getProducts } from "../services/products";

export const ProductsContext = React.createContext({
  products: [] as Product[],
  newProducts: [] as Product[],
  hotProducts: [] as Product[],
  loading: false,
  errorMessage: "",
  loadProducts: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProducts = useCallback(() => {
    setErrorMessage("");
    setLoading(true);

    return getProducts()
      .then((products) => {
        setProducts(products);
        setNewProducts(
          [...products].sort(
            (product1, product2) =>
              -(product1.fullPrice - product1.price) -
              (product2.fullPrice - product2.price)
          )
        );
        setHotProducts(
          [...products].sort(
            (product1, product2) =>
              -(product1.fullPrice - product1.price) -
              (product2.fullPrice - product2.price)
          )
        );
      })
      .catch(() => {
        setErrorMessage("Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      products,
      newProducts,
      hotProducts,
      loading,
      errorMessage,
      loadProducts,
    }),
    [products, newProducts, hotProducts, loadProducts, loading, errorMessage]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const products = useContext(ProductsContext);

  return products;
}
