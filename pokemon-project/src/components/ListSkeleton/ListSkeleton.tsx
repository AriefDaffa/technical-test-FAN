import type { FC } from 'react';

interface ListSkeletonProps {}

const ListSkeleton: FC<ListSkeletonProps> = () => {
  return (
    <div>
      <div className="py-7 my-2 animate-pulse w-full bg-gray-200 bg-opacity-10 h-2 rounded-lg"></div>
      <div className="py-7 my-2 animate-pulse w-full bg-gray-200 bg-opacity-10 h-2 rounded-lg"></div>
      <div className="py-7 my-2 animate-pulse w-full bg-gray-200 bg-opacity-10 h-2 rounded-lg"></div>
      <div className="py-7 my-2 animate-pulse w-full bg-gray-200 bg-opacity-10 h-2 rounded-lg"></div>
      <div className="py-7 my-2 animate-pulse w-full bg-gray-200 bg-opacity-10 h-2 rounded-lg"></div>
    </div>
  );
};

export default ListSkeleton;
