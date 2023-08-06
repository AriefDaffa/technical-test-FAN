import { AiOutlineSearch } from 'react-icons/ai';
import type { FC, ChangeEvent } from 'react';

interface SearchbarProps {
  keyword: string;
  handleKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Searchbar: FC<SearchbarProps> = (props) => {
  const { handleKeywordChange, keyword } = props;

  return (
    <form>
      <div className="relative text-black">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch size={22} />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm border rounded-lg outline-none "
          placeholder="Search Pokémon"
          required
          defaultValue={keyword}
          onChange={handleKeywordChange}
        />
      </div>
    </form>
  );
};

export default Searchbar;
