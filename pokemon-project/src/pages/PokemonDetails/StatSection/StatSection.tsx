import { motion } from 'framer-motion';
import type { FC } from 'react';

import capitalizeFirstLetter from '@/utils/capitalize-first-letter';
import type { PokemonDetailTypes } from '@/repository/getPokemonByKeyword/types';

interface StatSectionProps {
  data: PokemonDetailTypes;
}

const StatSection: FC<StatSectionProps> = (props) => {
  const { data } = props;

  const colorChanger = (value: number) => {
    if (value < 50) {
      return 'bg-red-500';
    } else if (value > 50 && value < 70) {
      return 'bg-yellow-500';
    } else if (value >= 70) {
      return 'bg-green-500';
    } else {
      return 'bg-blue-500';
    }
  };

  const nameNormalizer = (name: string) => {
    switch (name) {
      case 'special-attack':
        return 'Sp.Atk';
      case 'special-defense':
        return 'Sp.Def';
      default:
        return capitalizeFirstLetter(name);
    }
  };

  return (
    <div>
      <div className="text-xl font-semibold underline underline-offset-4">
        Stat
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {data.stats.map((item, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2 my-2 lg:grid-cols-3">
            <div className="flex flex-row justify-between col-span-2 lg:col-span-1">
              <div className="text-sm">{nameNormalizer(item.stat.name)}</div>
              <div className="text-sm w-fit">{item.base_stat}</div>
            </div>
            <div className="flex flex-col justify-center w-full col-span-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <motion.div
                  key={idx}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(item.base_stat / 252) * 100}%` }}
                  transition={{ duration: 1 }}
                  className={`${colorChanger(
                    item.base_stat
                  )} h-2.5 rounded-full `}
                  //   style={{ width: `${(item.base_stat / 252) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatSection;
