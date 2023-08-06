import { useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import type { ChangeEvent } from 'react';

import { useDebouncedState } from '@mantine/hooks';

import getAllPokemon from '@/repository/getAllPokemon';
import getPokemonByKeyword from '@/repository/getPokemonByKeyword';
import Searchbar from '@/components/Searchbar';
import Pagination from '@/components/Pagination';
import PaginationToggle from '@/components/PaginationToggle';
import { useInfiniteQuery, useQuery } from 'react-query';
import type { AllPokemonTypes } from '@/repository/getAllPokemon/types';

import HeroSection from './HeroSection';
import PokedexSection from './PokedexSection';
import ListSection from './ListSection';
import type { SearchResultTypes } from './types';

const PokemonList = () => {
  const ref = useRef(null);
  const [page, setPage] = useState(0);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(true);

  const [result, setResult] = useState<SearchResultTypes>({
    index: 0,
    name: '',
    url: ``,
  });
  const [keyword, setKeyword] = useDebouncedState('', 300);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start', 'end'],
  });

  // infinite scrolling
  const {
    data: infiniteData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<AllPokemonTypes>(['pokemon'], getAllPokemon, {
    getNextPageParam: (lastPage, page) => {
      if (!lastPage.next) {
        return undefined;
      }
      return page.length;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isInfiniteScroll,
  });

  // normal pagination
  const { data: normalData, isFetching: normalLoading } =
    useQuery<AllPokemonTypes>(
      ['pokemon', page],
      () => getAllPokemon({ pageParam: page }),
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !isInfiniteScroll,
      }
    );

  const { isFetching: isSearching } = useQuery(
    ['pokemon', keyword],
    () => getPokemonByKeyword(keyword),
    {
      onSuccess: (res) => {
        setResult({
          index: res.id,
          name: res.name,
          url: `https://pokeapi.co/api/v2/pokemon/${keyword}`,
        });
      },
      onError: () => {
        setResult({
          index: 0,
          name: '',
          url: ``,
        });
      },
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: keyword !== '',
    }
  );

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleEnableInfinite = () => {
    setIsInfiniteScroll(true);
  };

  const handleDisableInfinite = () => {
    setIsInfiniteScroll(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div ref={ref} className="relative">
      <HeroSection scrollYProgress={scrollYProgress} />
      <div className="relative flex flex-row justify-center">
        <PokedexSection scrollYProgress={scrollYProgress} />
      </div>
      <div className="h-32 bg-[#222222]" />
      <div className="h-screen bg-[#222222]">
        <ListSection
          isLoading={isLoading}
          isFetchingNext={isFetchingNextPage}
          hasNextPage={hasNextPage}
          scrollYProgress={scrollYProgress}
          fetchNext={fetchNextPage}
          searchResult={result}
          keyword={keyword}
          isSearching={isSearching}
          isInfiniteScroll={isInfiniteScroll}
          currentNormalPage={page}
          isNormalLoading={normalLoading}
          infiniteScrollData={infiniteData?.pages?.flatMap(
            (page) => page.results
          )}
          normalData={normalData?.results}
          filterComponent={
            <>
              <Searchbar
                keyword={keyword}
                handleKeywordChange={handleKeywordChange}
              />
              {keyword === '' && (
                <PaginationToggle
                  isInfiniteScroll={isInfiniteScroll}
                  handleEnableInfinite={handleEnableInfinite}
                  handleDisableInfinite={handleDisableInfinite}
                />
              )}
            </>
          }
        />
      </div>
      {!isInfiniteScroll && (
        <div className=" max-w-screen-lg right-0 left-0 mx-auto font-pokemonGb text-white">
          <Pagination
            currentPage={page}
            nextPage={nextPage}
            prevPage={prevPage}
            totalData={normalData?.count}
            isFirstPage={normalData?.previous === null}
            isLastPage={normalData?.next === null}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
