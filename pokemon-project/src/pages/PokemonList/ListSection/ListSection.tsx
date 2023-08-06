import { Fragment, useRef, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import type { ChangeEvent, FC } from 'react';
import type { MotionValue } from 'framer-motion';
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from 'react-query';

import { useIntersection } from '@mantine/hooks';

import List from '@/components/List';
import Searchbar from '@/components/Searchbar';
import ListSkeleton from '@/components/ListSkeleton';
import type {
  PokemonResults,
  AllPokemonTypes,
} from '@/repository/getAllPokemon/types';
import type { SearchResultTypes } from '@/pages/PokemonList/types';
import SearchResult from './SearchResult/SearchResult';

interface ListSectionProps {
  isLoading: boolean;
  isFetchingNext: boolean;
  isSearching: boolean;
  keyword: string;
  searchResult: SearchResultTypes;
  scrollYProgress: MotionValue<number>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fetchNext: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<AllPokemonTypes, unknown>>;
  hasNextPage?: boolean;
  pokemonList?: PokemonResults[];
}

const ListSection: FC<ListSectionProps> = (props) => {
  const {
    scrollYProgress,
    isFetchingNext,
    isSearching,
    pokemonList,
    // isLoading,
    fetchNext,
    hasNextPage,
    searchResult,
    keyword,
    onChange,
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
      className=" max-w-screen-lg fixed bottom-0 left-0 right-0 mx-auto flex flex-col text-white z-50 px-4 h-screen py-5 "
    >
      <div className="text-xl mb-4 text-center">Find your Pokemon below!</div>
      <Searchbar keyword={keyword} handleKeywordChange={onChange} />
      <div className="px-1 mt-4 font-pokemonGb overflow-y-auto overflow-x-hidden">
        {keyword === '' ? (
          <Fragment>
            {pokemonList?.map((item, idx) => (
              <div key={idx} ref={ref}>
                <List index={idx} name={item.name} />
              </div>
            ))}
            {isFetchingNext && <ListSkeleton />}
          </Fragment>
        ) : (
          <SearchResult
            keyword={keyword}
            isSearching={isSearching}
            searchResult={searchResult}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ListSection;
