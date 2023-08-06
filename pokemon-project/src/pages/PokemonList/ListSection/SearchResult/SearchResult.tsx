import type { FC } from 'react';

import List from '@/components/List';
import ListSkeleton from '@/components/ListSkeleton';
import { SearchResultTypes } from '@/pages/PokemonList/types';

interface SearchResultProps {
  keyword: string;
  isSearching: boolean;
  searchResult: SearchResultTypes;
}

const SearchResult: FC<SearchResultProps> = (props) => {
  const { keyword, isSearching, searchResult } = props;

  return isSearching ? (
    <ListSkeleton />
  ) : searchResult.name !== '' ? (
    <List index={searchResult.index} name={searchResult.name} />
  ) : (
    <div className="h-[40vh] flex flex-col">
      <div className="flex h-full items-end justify-center">
        <div className="text-center">
          Pokemon with keyword {`'${keyword}'`} Not Found
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
