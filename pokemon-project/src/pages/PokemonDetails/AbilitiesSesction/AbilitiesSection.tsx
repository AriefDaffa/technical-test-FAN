import type { FC } from 'react';

import type { PokemonDetailTypes } from '@/repository/getPokemonByKeyword/types';

interface AbilitiesSectionProps {
  data: PokemonDetailTypes;
}

const AbilitiesSection: FC<AbilitiesSectionProps> = (props) => {
  const { data } = props;

  return (
    <div className="my-4">
      <div className="text-xl font-semibold underline underline-offset-4">
        Abilities
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 overflow-x-auto now">
        {data.abilities.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-800 rounded-lg flex justify-center align-middle shadow-md"
          >
            <div className="text-sm text-center">{item.ability.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbilitiesSection;
