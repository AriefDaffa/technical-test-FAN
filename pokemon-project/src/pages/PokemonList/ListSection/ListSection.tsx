import { Fragment, useRef, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import type { FC, ReactNode } from 'react';
import type { MotionValue } from 'framer-motion';
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from 'react-query';

import { useIntersection } from '@mantine/hooks';

import List from '@/components/List';
import ListSkeleton from '@/components/ListSkeleton';
import type {
  PokemonResults,
  AllPokemonTypes,
} from '@/repository/getAllPokemon/types';
import type { SearchResultTypes } from '@/pages/PokemonList/types';

import SearchResult from './SearchResult';

interface ListSectionProps {
  isLoading: boolean;
  isFetchingNext: boolean;
  isSearching: boolean;
  isNormalLoading: boolean;
  isInfiniteScroll: boolean;
  keyword: string;
  currentNormalPage: number;
  searchResult: SearchResultTypes;
  filterComponent: ReactNode;
  scrollYProgress: MotionValue<number>;
  fetchNext: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<AllPokemonTypes, unknown>>;
  hasNextPage?: boolean;
  normalData?: PokemonResults[];
  infiniteScrollData?: PokemonResults[];
}

const ListSection: FC<ListSectionProps> = (props) => {
  const {
    scrollYProgress,
    isFetchingNext,
    isSearching,
    infiniteScrollData,
    isInfiniteScroll,
    normalData,
    // isLoading,
    currentNormalPage,
    fetchNext,
    hasNextPage,
    searchResult,
    keyword,
    filterComponent,
    isNormalLoading,
  } = props;

  const containerRef = useRef();
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const display = useTransform(scrollYProgress, (disp) =>
    disp >= 0.9 ? '' : 'none'
  );

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNext();
    }
  }, [entry, fetchNext, hasNextPage]);

  return (
    <motion.div
      style={{ opacity, display }}
      className=" max-w-screen-lg fixed bottom-0 left-0 right-0 mx-auto flex flex-col text-white z-50 px-4 h-screen py-5 font-pokemonGb"
    >
      <div className="text-xl mb-4 text-center">Find your Pokemon below!</div>
      {filterComponent}
      <div className="px-1 mt-4 overflow-y-auto overflow-x-hidden">
        {keyword === '' ? (
          <Fragment>
            {!isInfiniteScroll ? (
              <Fragment>
                {normalData?.map((item, idx) => (
                  <List
                    key={`${item.url + idx}`}
                    index={currentNormalPage * 20 + idx}
                    name={item.name}
                  />
                ))}
                {isNormalLoading && <ListSkeleton />}
              </Fragment>
            ) : (
              <Fragment>
                {infiniteScrollData?.map((item, idx) => (
                  <div key={idx} ref={ref}>
                    <List index={idx} name={item.name} />
                  </div>
                ))}
                {isFetchingNext && <ListSkeleton />}
              </Fragment>
            )}
          </Fragment>
        ) : (
          <SearchResult
            keyword={keyword}
            isSearching={isSearching}
            searchResult={searchResult}
          />
        )}
      </div>
      <div className="h-64 md:h-36"></div>
    </motion.div>
  );
};

export default ListSection;
