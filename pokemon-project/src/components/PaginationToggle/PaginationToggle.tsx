import type { FC } from 'react';

interface PaginationToggleProps {
  isInfiniteScroll: boolean;
  handleEnableInfinite: () => void;
  handleDisableInfinite: () => void;
}

const PaginationToggle: FC<PaginationToggleProps> = (props) => {
  const { isInfiniteScroll, handleEnableInfinite, handleDisableInfinite } =
    props;

  return (
    <div className="w-full flex justify-center">
      <div className="flex border mt-4 rounded-lg w-fit text-white align-middle items-center justify-center">
        <button
          disabled={isInfiniteScroll}
          onClick={handleEnableInfinite}
          className={`p-2 h-full ${
            isInfiniteScroll ? 'bg-red-600' : ''
          } rounded-l-lg text-xs hover:cursor-pointer md:text-sm`}
        >
          Infinite Scroll Pagination
        </button>
        <button
          disabled={!isInfiniteScroll}
          onClick={handleDisableInfinite}
          className={`p-2 h-full ${
            !isInfiniteScroll ? 'bg-red-600' : ''
          } rounded-r-lg text-xs hover:cursor-pointer md:text-sm`}
        >
          Normal Pagination
        </button>
      </div>
    </div>
  );
};

export default PaginationToggle;
