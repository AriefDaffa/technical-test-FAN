import type { FC } from 'react';

import pokemonTypesColor from '@/utils/pokemon-types-color';
import capitalizeFirstLetter from '@/utils/capitalize-first-letter';
import type { PokemonDetailTypes } from '@/repository/getPokemonByKeyword/types';

interface SpriteSectionProps {
  data: PokemonDetailTypes;
}

const SpriteSection: FC<SpriteSectionProps> = (props) => {
  const { data } = props;

  return (
    <div className="">
      <div>
        <div className="text-gray-500">#{('0000' + data.id).slice(-4)}</div>
        <div className="text-4xl font-bold">
          {capitalizeFirstLetter(data.name)}
        </div>
        <div className="mt-2 flex flex-row gap-2 flex-wrap">
          {data.types.map((item, idx) => (
            <div
              key={idx}
              className={`py-1 px-3 text-sm rounded-full ${pokemonTypesColor(
                item.type.name
              )} text-black w-fit`}
            >
              {item.type.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center relative">
        <div
          className={`${pokemonTypesColor(
            data.types[0].type.name
          )} rounded-full absolute w-2/3 h-2/3 top-0 bottom-0 my-auto blur-3xl`}
        />
        <img
          src={data.sprites.front_default}
          alt=""
          className="w-full object-cover drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default SpriteSection;
