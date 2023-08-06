import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import getPokemonByKeyword from '@/repository/getPokemonByKeyword';
import type { PokemonDetailTypes } from '@/repository/getPokemonByKeyword/types';

import StatSection from './StatSection';
import AbilitiesSection from './AbilitiesSesction';
import PokemonDesc from './PokemonDesc';
import SpriteSection from './SpriteSection';
import Loader from './Loader';

const PokemonDetails = () => {
  const { keyword } = useParams();

  const navigate = useNavigate();

  const { data, isFetching } = useQuery<PokemonDetailTypes>(
    ['pokemon', keyword],
    () => getPokemonByKeyword(keyword || ''),
    {
      enabled: keyword !== '',
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    }
  );

  if (isFetching) {
    return <Loader />;
  } else if (typeof data === 'undefined') {
    return <Navigate to={'/not-found'} />;
  }

  return (
    <div className="relative bg-[#222222] text-white font-pokemonGb ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-lg min-h-screen mx-auto px-2"
      >
        <div className="py-2 h-10 flex flex-row md:h-16">
          <div className="w-fit self-center hover: cursor-pointer">
            <AiOutlineArrowLeft size={20} onClick={() => navigate('/')} />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2">
          <SpriteSection data={data} />
          <div className="md:h-[85vh] md:overflow-y-auto">
            <PokemonDesc data={data} />
            <AbilitiesSection data={data} />
            <StatSection data={data} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PokemonDetails;
