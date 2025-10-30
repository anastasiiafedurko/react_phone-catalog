import { PaginationRange } from "../types/paginationRange";

export const getPaginationRange = (
  totalPage: number,
  page: number,
  limit: number,
  siblings: number
): PaginationRange[] => {
  const result: PaginationRange[] = [];

  const totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPage) {
    for (let i = 1; i <= totalPage; i++) {
      result.push({ text: i.toString(), value: i });
    }
    return result;
  }

  console.log(limit);

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const showLeftDots = leftSiblingsIndex > 2;

  const rightSiblingsIndex = Math.min(page + siblings, totalPage);
  const showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;

    for (let i = 1; i <= leftItemsCount + 1; i++) {
      result.push({ text: i.toString(), value: i });
    }
    result.push({ text: "...", value: leftItemsCount + 2 });
    result.push({ text: totalPage.toString(), value: totalPage });

    return result;
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;

    result.push({ text: "1", value: 1 });
    result.push({ text: "...", value: 2 });
    for (let i = totalPage - rightItemsCount + 1; i <= totalPage; i++) {
      result.push({ text: i.toString(), value: i });
    }

    return result;
  } else {
    result.push({ text: "1", value: 1 });
    result.push({ text: "...", value: 2 });
    for (let i = leftSiblingsIndex; i <= rightSiblingsIndex + 1; i++) {
      result.push({ text: i.toString(), value: i });
    }
    result.push({ text: "...", value: rightSiblingsIndex + 2 });
    result.push({ text: totalPage.toString(), value: totalPage });

    return result;
  }
};
