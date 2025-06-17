import { Option as OptionType } from "../../types/option";

type Props<T extends string | number> = {
  option: OptionType<T>;
  onClick: (value: T) => void;
};

export const Option = <T extends string | number>({
  option,
  onClick,
}: Props<T>) => {
  return (
    <li
      className="relative cursor-default py-2 pr-9 pl-3 text-primary select-none hover:bg-hover-bg"
      id="listbox-option-0"
      role="option"
      onClick={() => onClick(option.value)}
    >
      <div className="flex items-center">
        <span className="ml-3 block truncate font-normal">{option.text}</span>
      </div>
    </li>
  );
};
