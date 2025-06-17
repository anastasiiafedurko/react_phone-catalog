import { Accessory } from "./types/accessory";
import { Phone } from "./types/phone";
import { Product } from "./types/product";
import { Tablet } from "./types/tablet";

const BASE_URL = "http://localhost:5173/public/api/";

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + ".json";

  // add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then((res) => res.json());
}

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
