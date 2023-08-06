import { useMemo } from 'react';
import type { FC } from 'react';

interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  totalData?: number;
  currentPage?: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

const Pagination: FC<PaginationProps> = (props) => {
  const {
    totalData,
    currentPage = 0,
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
  } = props;

  const countTotalPage = useMemo(() => {
    const dataPerPage = 20;

    if (typeof totalData === 'undefined') {
      return;
    }

    return Math.ceil(totalData / dataPerPage);
  }, [totalData]);

  return (
    <div className="z-50 p-4 absolute max-w-screen-lg mx-auto bg-[#222222] bottom-0 w-full flex flex-col justify-between items-center mt-1 md:flex-row">
      <div>
        Page {currentPage + 1} of {countTotalPage}
      </div>
      <div className="flex border rounded-lg w-fit text-white align-middle items-center justify-center">
        <button
          disabled={isFirstPage}
          onClick={prevPage}
          className="p-1 px-4 border-r rounded-l-lg hover:bg-red-600 disabled:bg-gray-600 disabled:hover:bg-gray-600"
        >
          Prev
        </button>
        <button
          disabled={isLastPage}
          onClick={nextPage}
          className="p-1 px-4 border-l rounded-r-lg hover:bg-red-600 disabled:bg-gray-600 disabled:hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
