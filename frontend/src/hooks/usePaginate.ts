import React, { useMemo, useCallback } from "react";

const usePaginate = (
  curPage: number,
  setCurPage: React.Dispatch<React.SetStateAction<number>>,
  totalPage: number,
  divider: number
) => {
  const isFirst = useMemo(() => curPage === 1, [curPage]);
  const isLast = useMemo(() => curPage === totalPage, [curPage, totalPage]);
  const startPageNumber = (Math.ceil(curPage / divider) - 1) * divider + 1;
  const pageIndexList = Array(divider)
    .fill(0)
    .map((_, idx) =>
      startPageNumber + idx <= totalPage ? startPageNumber + idx : null
    );
  const pages = pageIndexList.filter((idx) => Number.isInteger(idx));

  const handleNextButtonClick = useCallback(() => {
    setCurPage(curPage + 1);
  }, [curPage, setCurPage]);

  const handlePrevButtonClick = useCallback(() => {
    setCurPage(curPage - 1);
  }, [curPage, setCurPage]);

  const handlePageButtonClick = useCallback(
    (page: number) => () => {
      setCurPage(page);
    },
    [setCurPage]
  );

  return {
    isFirst,
    isLast,
    pages,
    handleNextButtonClick,
    handlePrevButtonClick,
    handlePageButtonClick,
  };
};

export default usePaginate;
