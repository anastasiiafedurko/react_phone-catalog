import { Phone } from "../types/phone";
import { Product } from "../types/product";

import { getProducts } from "./products";

import { getData } from "../utils/httpClient";

export async function getPhones(
  page: number,
  limit: number
): Promise<{ phones: Product<Phone>[]; total: number }> {
  // const { data: phones, error } = await supabase.from("phones").select("*");
  // const { data: phones, error } = await getData<Phone[]>("/phones.json");

  // if (error) {
  //   console.error("Error whith fatching data:", error.message);
  //   return { phones: [], total: 0 };
  // }

  // if (!phones) {
  //   console.warn("Error can't find phones");
  //   return { phones: [], total: 0 };
  // }
  const phones = await getData<Phone[]>("/phones.json");
  const startIndex = (page - 1) * limit;
  const paginatedPhones = phones.slice(startIndex, startIndex + limit);
  const phoneIds = paginatedPhones.map((phone) => phone.id);
  const total = phones.length;

  const products = await getProducts();
  const foundProducts = products.filter((product) =>
    phoneIds.includes(product.itemId)
  );

  const phoneProducts = foundProducts.map((product) => ({
    ...product,
    item: phones.find((phone) => phone.id === product.itemId),
  }));
  return {
    phones: phoneProducts,
    total,
  };
}
