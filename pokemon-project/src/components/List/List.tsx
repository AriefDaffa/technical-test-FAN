import { useState } from 'react';
import { TbPokeball } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

interface ListProps {
  index: number;
  name: string;
}

const List: FC<ListProps> = (props) => {
  const { index, name } = props;

  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const onHover = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      onClick={() => navigate(`pokedex/${name}`)}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      className={`flex flex-row justify-between relative overflow-hidden gap-2 w-full my-1 rounded-lg ${
        hover ? 'bg-red-600' : ''
      } hover:cursor-pointer`}
    >
      <div className="p-4 text-sm font-semibold self-center md:text-xl ">
        #{('0000' + (index + 1)).slice(-4)}
      </div>
      <div
        className={`p-4 flex-1 z-10 -skew-x-[30deg] relative ${
          hover ? 'bg-black' : ''
        } `}
      >
        <div className="flex flex-row flex-1 gap-1 justify-between skew-x-[30deg] ">
          <div className="text-sm font-semibold self-center md:text-xl">
            {name}
          </div>
          <div className="flex flex-row">
            <TbPokeball size={26} className="self-center hidden md:block" />
          </div>
        </div>
      </div>
      <div
        className={`w-10 h-full ${
          hover ? 'bg-black' : ''
        } absolute right-0 z-0`}
      />
    </div>
  );
};

export default List;
