import { Accessory } from "../../types/accessory";
import { Phone } from "../../types/phone";
import { Product } from "../../types/product";
import { Tablet } from "../../types/tablet";
import { ProductCard } from "../ProductCard";

type Props = {
  products: Product<Phone>[] | Product<Tablet>[] | Product<Accessory>[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard
          id={product.item?.id || ""}
          name={product.name}
          image={product.item?.images[0] || product.image}
          fullPrice={product.item?.priceRegular || product.fullPrice}
          price={product.item?.priceDiscount || product.price}
          screen={product.screen}
          capacity={product.capacity}
          ram={product.ram}
          key={product.id}
        />
      ))}
    </div>
  );
};
