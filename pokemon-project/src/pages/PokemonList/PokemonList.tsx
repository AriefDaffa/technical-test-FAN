import { useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import type { ChangeEvent } from 'react';

import { useDebouncedState } from '@mantine/hooks';

import getAllPokemon from '@/repository/getAllPokemon';
import getPokemonByKeyword from '@/repository/getPokemonByKeyword';
import { useInfiniteQuery, useQuery } from 'react-query';
import type { AllPokemonTypes } from '@/repository/getAllPokemon/types';

import HeroSection from './HeroSection';
import PokedexSection from './PokedexSection';
import ListSection from './ListSection';
import type { SearchResultTypes } from './types';

const PokemonList = () => {
  const ref = useRef(null);

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

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<AllPokemonTypes>(['pokemon'], getAllPokemon, {
      getNextPageParam: (lastPage, page) => {
        if (!lastPage.next) {
          return undefined;
        }
        return page.length;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

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
          onChange={handleKeywordChange}
          isSearching={isSearching}
          pokemonList={data?.pages.flatMap((page) => page.results)}
        />
      </div>
    </div>
  );
};

export default PokemonList;
