import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode | number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

export const IconButton: React.FC<Props> = ({
  icon,
  isActive,
  isDisabled,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames(
        "flex justify-center items-center h-[40px] w-[40px] border border-icons font-medium rounded-none text-sm p-2.5 text-center er:text-white",
        {
          "border-primary": isActive,
        },
        isDisabled
          ? "hover:border-icons text-secondary"
          : " hover:border-primary text-primary"
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
