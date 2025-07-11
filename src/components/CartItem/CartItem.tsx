import { Minus, Plus, X } from "lucide-react";
import { IconButton } from "../ui/IconButton";

type Props = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  onPlus: () => void;
  onMinus: () => void;
};

export const CartItem: React.FC<Props> = ({
  name,
  image,
  price,
  quantity,
  onPlus,
  onMinus,
}) => {
  return (
    <div className="flex flex-col md:flex-row border items-center px-4 py-8 gap-4">
      <div className="flex items-center gap-4 w-full md:w-2/3">
        <X
          className="h-4 w-4 text-secondary cursor-pointer"
          onClick={onMinus}
        />

        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt="Phone"
          className="w-[50px] h-[66px]"
        />

        <p className="text-sm md:text-base font-medium flex-1">{name}</p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-1/3">
        <div className="flex items-center gap-2">
          <IconButton icon={<Minus />} onClick={onMinus} />
          <p>{quantity}</p>
          <IconButton icon={<Plus />} onClick={onPlus} />
        </div>

        <p className="font-mont-semibold text-primary text-xl">${price}</p>
      </div>
    </div>
  );
};
