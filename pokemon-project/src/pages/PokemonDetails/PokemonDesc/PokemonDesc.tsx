import type { FC } from 'react';

import convertHeight from '@/utils/convert-height';
import convertWeight from '@/utils/convert-weight';
import capitalizeFirstLetter from '@/utils/capitalize-first-letter';
import type { PokemonDetailTypes } from '@/repository/getPokemonByKeyword/types';

interface PokemonDescProps {
  data: PokemonDetailTypes;
}

const PokemonDesc: FC<PokemonDescProps> = (props) => {
  const { data } = props;

  return (
    <div className="my-4">
      <div className="text-xl font-semibold underline underline-offset-4">
        Descriptions
      </div>
      <div className="grid grid-cols-2 gap-1 mt-4">
        <div>Species</div>
        <div>:{capitalizeFirstLetter(data.species.name)}</div>
        <div>Height</div>
        <div>:{convertHeight(data.height)}m</div>
        <div>Weight</div>
        <div>:{convertWeight(data.weight)}Kg</div>
      </div>
    </div>
  );
};

export default PokemonDesc;
