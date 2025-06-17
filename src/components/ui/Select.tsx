import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Option as OptionType } from "../../types/option";
import { Link, useSearchParams } from "react-router";
import { getSearchWith } from "../../utils/searchHelper";

type Props<T extends string | number> = {
  name: string;
  options: OptionType<T>[];
  selectedOption?: string;
  param: string;
  valueType: keyof OptionType<T>;
};

const classNameArrow =
  "col-start-1 row-start-1 size-4 self-center justify-self-end text-gray-500 sm:size-4 mx-2";

export const Select = <T extends string | number>({
  name,
  options = [],
  selectedOption = "",
  param,
  valueType,
}: Props<T>) => {
  const [showSelect, setShowSelect] = useState(false);

  const [searchParams] = useSearchParams();

  const handleSelectClick = () => {
    setShowSelect((prev) => !prev);
  };

  return (
    <div className="my-8">
      <label
        id="listbox-label"
        className="block text-sm/6 font-medium text-secondary"
      >
        {name}
      </label>
      <div
        className="relative w-auto"
        onMouseLeave={() => setShowSelect(false)}
      >
        <div className="w-fit" onClick={handleSelectClick}>
          <button
            type="button"
            className="grid cursor-default grid-cols-1 bg-white py-1.5 text-left text-primary sm:text-sm/6"
          >
            <span className="col-start-1 row-start-1 flex items-center gap-3 p-2 border border-icons hover:border-primary">
              <span className="block truncate mr-10">{selectedOption}</span>
            </span>

            {!showSelect ? (
              <ChevronDown className={classNameArrow} />
            ) : (
              <ChevronUp className={classNameArrow} />
            )}
          </button>
        </div>

        {showSelect && (
          <ul className="absolute w-auto z-10 max-h-56 overflow-auto bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm">
            {options.map((option) => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    [param]: String(option[valueType]),
                  }),
                }}
                key={option.value}
              >
                <li
                  className="relative cursor-default py-2 pr-9 pl-3 text-primary select-none hover:bg-hover-bg"
                  id="listbox-option-0"
                  role="option"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal">
                      {option.text}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
