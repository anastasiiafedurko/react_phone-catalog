import { Accessory } from "../../types/accessory";
import { Phone } from "../../types/phone";
import { Product } from "../../types/product";
import { Tablet } from "../../types/tablet";
import { ProductCard } from "../ProductCard";

type Props = {
  products: Product<Phone | Tablet | Accessory>[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
