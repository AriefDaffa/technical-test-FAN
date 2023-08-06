import { MdCatchingPokemon } from 'react-icons/md';

const Loader = () => {
  return (
    <div className="bg-[#222222] h-screen text-white font-pokemonGb flex flex-col justify-center items-center">
      <div className="animate-spin">
        <MdCatchingPokemon size={150} />
      </div>
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default Loader;
