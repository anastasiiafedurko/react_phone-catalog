import { Accessory } from "../types/accessory";
import { Phone } from "../types/phone";
import { Product } from "../types/product";
import { Tablet } from "../types/tablet";

import { getData } from "../utils/httpClient";

export function getProducts() {
  return getData<Product[]>("/products.json");
}

export async function getProduct(itemId: string) {
  const products = await getData<Product[]>("/products.json");
  return products.find((product) => product.itemId === itemId);
}

export async function getProductByCategory<
  T extends Phone | Tablet | Accessory
>(
  category: "phones" | "tablets" | "accessories",
  itemId: string
): Promise<Product<T> | null> {
  const data = await getData<T[]>(`/${category}.json`);
  const item = data.find((item) => item.id === itemId);

  if (!item) return null;

  const product = await getProduct(itemId);
  if (!product) return null;

  return {
    ...product,
    item,
  };
}

export async function getProductsByCategory<
  T extends Phone | Tablet | Accessory
>(
  category: "phones" | "tablets" | "accessories",
  page: number,
  limit: number
): Promise<{ items: Product<T>[]; total: number }> {
  const data = await getData<T[]>(`/${category}.json`);

  const startIndex = (page - 1) * limit;
  const paginatedItems = data.slice(startIndex, startIndex + limit);
  const itemIds = paginatedItems.map((item) => item.id);
  const total = data.length;

  const products = await getProducts();
  const foundProducts = products.filter((product) =>
    itemIds.includes(product.itemId)
  );

  const categoryProducts = foundProducts.map((product) => ({
    ...product,
    item: data.find((item) => item.id === product.itemId),
  }));

  return {
    items: categoryProducts,
    total,
  };
}
