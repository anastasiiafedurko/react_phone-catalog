import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import { PaginationRange } from "../../types/paginationRange";
import { Link, useSearchParams } from "react-router";
import { getSearchWith } from "../../utils/searchHelper";

type Props = {
  pagination: PaginationRange[];
  activePage: number;
  totalPages: number;
  onClick?: () => void;
};

export const PaginationButtons: React.FC<Props> = ({
  pagination,
  activePage,
  totalPages,
  onClick = () => {},
}) => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || activePage;

  return (
    <div className="flex flex-row gap-2 justify-center items-center my-10">
      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: String(+page - 1),
          }),
        }}
      >
        <IconButton icon={<ChevronLeft />} isDisabled={activePage === 1} />
      </Link>

      {pagination.map((page, index) => (
        <Link
          to={{
            search: getSearchWith(searchParams, {
              page: page.text,
            }),
          }}
          key={index}
        >
          <IconButton
            icon={page.text}
            isActive={page.value === activePage}
            onClick={onClick}
            key={index}
          />
        </Link>
      ))}

      <Link
        to={{
          search: getSearchWith(searchParams, {
            page: String(+page + 1),
          }),
        }}
      >
        <IconButton
          icon={<ChevronRight />}
          isDisabled={activePage === totalPages}
        />
      </Link>
    </div>
  );
};
