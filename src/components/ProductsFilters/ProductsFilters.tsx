import { Select } from "../ui/Select";
import { Option as OptionType } from "../../types/option";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

type Props<T extends string | number> = {
  perPageOptions: OptionType<T>[];
};

type SortByValue = "age" | "title" | "price";

const SORT_BY_OPTIONS: OptionType<SortByValue>[] = [
  {
    text: "Newest",
    value: "age",
  },
  { text: "Alphabetically", value: "title" },
  { text: "Cheapest", value: "price" },
];

export const ProductsFilters = <T extends string | number>({
  perPageOptions,
}: Props<T>) => {
  const [selectedPerPageOption, setSelectedPerPageOption] = useState<
    OptionType<T> | undefined
  >();

  const [selectedSortByOption, setSortByOption] = useState<
    OptionType<SortByValue> | undefined
  >();

  const [searchParams] = useSearchParams();

  const perPage = searchParams.get("perPage") || perPageOptions[0].text;
  const sortBy = searchParams.get("sortBy") || SORT_BY_OPTIONS[0].value;

  useEffect(() => {
    const matched = perPageOptions.find((o) => o.text === perPage);
    setSelectedPerPageOption(matched);
  }, [perPageOptions, perPage]);

  useEffect(() => {
    const matched = SORT_BY_OPTIONS.find((o) => o.value === sortBy);
    setSortByOption(matched);
  }, [sortBy]);

  return (
    <div className="flex flex-row gap-4">
      <Select
        name="Sort by"
        options={SORT_BY_OPTIONS}
        param={"sortBy"}
        selectedOption={selectedSortByOption?.text}
        valueType="value"
      />
      <Select
        name="Items on page"
        options={perPageOptions}
        param={"perPage"}
        selectedOption={selectedPerPageOption?.text}
        valueType="text"
      />
    </div>
  );
};
