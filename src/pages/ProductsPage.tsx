import { useEffect, useMemo, useState } from "react";
import { ProductsList } from "../components/ProductsList/ProductsList";
import { Phone } from "../types/phone";
import { getPaginationRange } from "../utils/pagination";
import { ClipLoader } from "react-spinners";
import { PaginationRange } from "../types/paginationRange";
import { PaginationButtons } from "../components/Pagination/PaginationButtons";
import { useParams, useSearchParams } from "react-router";
import { ProductsFilters } from "../components/ProductsFilters/ProductsFilters";
import { Product } from "../types/product";
import { getSearchWith } from "../utils/searchHelper";
import { getProductsByCategory } from "../services/products";
import { Tablet } from "../types/tablet";
import { Accessory } from "../types/accessory";

type CategoryType = "phones" | "tablets" | "accessories";

const defaultOptions: { text: string; value: number }[] = [4, 8, 16].map(
  (o) => ({
    value: o,
    text: String(o),
  })
);

export const PhonesPage = () => {
  const { category } = useParams<{
    category: CategoryType;
  }>();

  const [products, setProducts] = useState<
    Product<Phone | Tablet | Accessory>[]
  >([]);

  const [total, setTotal] = useState(0);
  const [perPageOptions, setPerPageOptions] = useState<
    { text: string; value: number }[]
  >([]);
  const [perPageValue, setPerPageValue] = useState(0);
  const [paginationRange, setPagination] = useState<PaginationRange[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchParams] = useSearchParams();

  const params = useMemo(
    () => ({
      page: searchParams.get("page") || 1,
      perPageText: searchParams.get("perPage") || "",
      sortBy: searchParams.get("sortBy") || "",
    }),
    [searchParams]
  );

  useEffect(() => {
    setPerPageValue(
      perPageOptions.find((o) => o.text === params.perPageText)?.value || total
    );
  }, [perPageOptions, total, params.perPageText]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / perPageValue));
  }, [total, perPageValue]);

  useEffect(() => {
    setPerPageOptions([{ value: total, text: "all" }, ...defaultOptions]);
  }, [total]);

  const getTypedCategory = (category: CategoryType) => {
    switch (category) {
      case "phones":
        return getProductsByCategory<Phone>(
          category,
          +params.page,
          perPageValue
        );
      case "tablets":
        return getProductsByCategory<Tablet>(
          category,
          +params.page,
          perPageValue
        );
      case "accessories":
        return getProductsByCategory<Accessory>(
          category,
          +params.page,
          perPageValue
        );
      default:
        throw new Error("Invalid category");
    }
  };

  useEffect(() => {
    getSearchWith(searchParams, {
      page: "1",
    });
    setErrorMessage("");
    setLoading(true);
    getTypedCategory(category as CategoryType)
      .then((response) => {
        setProducts(response.items);
        setTotal(response.total);
      })
      .catch(() => {
        setErrorMessage("Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [searchParams, params, perPageValue, category]);

  useEffect(() => {
    setPagination(
      getPaginationRange(
        totalPages,
        +params.page,
        perPageOptions.find((o) => o.text === params.perPageText)?.value ||
          total,
        1
      )
    );
  }, [totalPages, params.page, params.perPageText, perPageOptions, total]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (params.sortBy) {
      case "age":
        return -a.year + b.year;
      case "title":
        return a.name.localeCompare(b.name);
      case "price":
        return (a.item?.priceDiscount || 0) - (b.item?.priceDiscount || 0);
      default:
        return 0;
    }
  });

  function pageChange() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <h1 className="text-4xl font-mont-bold text-primary my-10">
        Mobile phones
      </h1>

      {loading && <ClipLoader color="#313237" loading={true} size={50} />}

      {errorMessage && <p className="text-2xl text-red-500">{errorMessage}</p>}

      {total === 0 && !loading && <p>There are no phones on the server</p>}

      {!loading && !errorMessage && (
        <>
          <p className="text-secondary">{total} models</p>

          <div className="flex flex-row gap-4">
            {total > 4 && perPageOptions.length && (
              <ProductsFilters perPageOptions={perPageOptions} />
            )}
          </div>

          <ProductsList products={sortedProducts} />

          <PaginationButtons
            pagination={paginationRange}
            activePage={+params.page}
            totalPages={totalPages}
            onClick={pageChange}
          />
        </>
      )}
    </div>
  );
};
