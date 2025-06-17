import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductByCategory } from "../services/products";
import { Product } from "../types/product";
import { Phone } from "../types/phone";
import { Tablet } from "../types/tablet";
import { Accessory } from "../types/accessory";
import { ProductGallery } from "../components/ProductGallery";
import { IconButton } from "../components/ui/IconButton";
import { Heart } from "lucide-react";
import classNames from "classnames";
import { ProductsContext } from "../store/ProductContext";
import { ProductsSlider } from "../components/ProductsSlider";
import { ProductCard } from "../components/ProductCard";
import { ClipLoader } from "react-spinners";

const colorClasses: Record<string, string> = {
  black: "bg-black",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  white: "bg-white",
  purple: "bg-purple-500",
  red: "bg-red-500",
  spacegray: "bg-gray-800",
  midnightgreen: "bg-emerald-900",
  gold: "bg-yellow-300",
  silver: "bg-gray-300",
  rosegold: "bg-rose-300",
  coral: "bg-pink-400",
  midnight: "bg-slate-900",
  spaceblack: "bg-neutral-950",
  blue: "bg-blue-500",
  pink: "bg-pink-300",
  graphite: "bg-gray-700",
  sierrablue: "bg-sky-700",
  "rose gold": "bg-rose-300",
  "sky blue": "bg-sky-400",
  starlight: "bg-zinc-100",
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const selectedProductId = productId || "";

  const [product, setProduct] = useState<Product<Phone | Tablet | Accessory>>();

  const { products, newProducts, loading, errorMessage, loadProducts } =
    useContext(ProductsContext);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    getProductByCategory("phones", selectedProductId).then((product) => {
      setProduct(product || undefined);
    });
  }, [selectedProductId]);

  function getProductByColor() {
    return products.find(
      (item) =>
        item.itemId.includes(product?.item?.namespaceId || "") &&
        item.color === product?.item?.color
    );
  }

  function getProductByCapacity() {
    return products.find(
      (item) =>
        item.itemId.includes(product?.item?.namespaceId || "") &&
        item.capacity === product?.item?.capacity &&
        item.color === product?.color
    );
  }

  return (
    <>
      {product && (
        <>
          <div>
            <h1 className="text-3xl font-mont-bold text-primary my-10">
              {product.name}
            </h1>

            <div className="flex flex-col md:flex-row w-full gap-20">
              <div className="w-[65%]">
                <ProductGallery images={product.item?.images || []} />
              </div>
              <div className="w-[30%] flex flex-col gap-6">
                <div>
                  <p className="text-secondary">Available colors</p>

                  <div className="flex flex-row gap-3">
                    {product.item?.colorsAvailable.map((color) => (
                      <Link
                        to={`../${getProductByColor()?.itemId}`}
                        key={color}
                      >
                        <button
                          type="button"
                          className={classNames(
                            "h-[30px] w-[30px] font-mont px-3 border rounded-full hover:border-secondary text-xs md:text-sm whitespace-nowrap",
                            color === product.color
                              ? `${colorClasses[color]} text-white border-primary`
                              : `${colorClasses[color]} text-white border-elements`
                          )}
                        ></button>
                      </Link>
                    ))}
                  </div>
                </div>

                <hr className="mb-2" />

                <div>
                  <p className="text-secondary">Select capacity</p>
                  <div className="flex flex-row gap-3">
                    {product.item?.capacityAvailable.map((capacity) => (
                      <Link
                        to={`../${getProductByCapacity()?.itemId}`}
                        key={capacity}
                      >
                        <button
                          type="button"
                          className={classNames(
                            "rounded-none h-[32px] w-auto font-mont px-3 border border-primary text-xs md:text-sm whitespace-nowrap",
                            capacity === product.capacity
                              ? "bg-primary text-white "
                              : "bg-white text-primary"
                          )}
                        >
                          {capacity}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
                <hr className="mb-2" />

                <div className="flex flex-row gap-1">
                  <p className="price font-mont-semibold text-primary text-3xl">
                    ${product.fullPrice}
                  </p>
                  <p className="price font-mont text-secondary line-through text-3xl">
                    ${product.price}
                  </p>
                </div>

                <div className="flex flex-row gap-1">
                  <button
                    type="button"
                    className="flex-auto rounded-none h-[40px] w-auto font-mont border border-primary text-white text-xs md:text-sm whitespace-nowrap bg-primary active:bg-white active:text-almost-green active:border active:border-secondary"
                  >
                    Add to cart
                  </button>

                  <IconButton icon={<Heart />} />
                </div>

                <div className="grid grid-rows-3 grid-cols-2 mb-2 text-xs">
                  <p className="text-secondary">Screen</p>
                  <p className="text-primary text-end">{product.screen}</p>
                  <p className="text-secondary">Resolution</p>
                  <p className="text-primary text-end">
                    {product.item?.resolution}
                  </p>
                  <p className="text-secondary">Processor</p>
                  <p className="text-primary text-end">
                    {product.item?.processor}
                  </p>
                  <p className="text-secondary">RAM</p>
                  <p className="text-primary text-end">{product.ram}</p>
                </div>
              </div>

              <div className="w-[5%]">
                <p className="text-secondary">ID: {product.id}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-14 my-10">
            <div className="w-[50%]">
              <h1 className="text-2xl font-mont-bold text-primary my-5">
                About
              </h1>
              <hr className="my-5" />

              {product.item?.description.map((description) => (
                <div className="flex flex-col gap-4" key={description.title}>
                  <p className="text-xl font-mont-bold text-primary">
                    {description.title}
                  </p>
                  <p className="text-secondary">{description.text}</p>
                </div>
              ))}
            </div>

            <div className="w-[50%]">
              <h1 className="text-2xl font-mont-bold text-primary my-5">
                Tech specs
              </h1>
              <hr className="my-5" />
              <div className="grid grid-rows-3 grid-cols-2 mb-2 text-xs gap-3">
                <p className="text-secondary">Screen</p>
                <p className="text-primary text-end">{product.screen}</p>
                <p className="text-secondary">Resolution</p>
                <p className="text-primary text-end">
                  {product.item?.resolution}
                </p>
                <p className="text-secondary">Processor</p>
                <p className="text-primary text-end">
                  {product.item?.processor}
                </p>
                <p className="text-secondary">RAM</p>
                <p className="text-primary text-end">{product.ram}</p>
                <p className="text-secondary">Built in memory</p>
                <p className="text-primary text-end">
                  {product.item?.capacity}
                </p>
                <p className="text-secondary">Camera</p>
                <p className="text-primary text-end">{product.item?.camera}</p>
                <p className="text-secondary">Zoom</p>
                <p className="text-primary text-end">{product.item?.zoom}</p>
                <p className="text-secondary">Cell</p>
                <p className="text-primary text-end">{product.item?.cell}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {loading && <ClipLoader color="#313237" loading={true} size={50} />}

      {!errorMessage && (
        <ProductsSlider title="You may also like">
          {newProducts.map((product) => (
            <ProductCard
              id={product.itemId}
              name={product.name}
              image={product.image}
              fullPrice={product.fullPrice}
              price={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              key={product.id}
            />
          ))}
        </ProductsSlider>
      )}
    </>
  );
};
