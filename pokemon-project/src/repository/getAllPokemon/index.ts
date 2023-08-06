import baseAPI from '@/utils/axios-utlis';

const getAllPokemon = async ({ pageParam = 0 }) => {
  const offset = pageParam * 20;

  return await baseAPI
    .get(`pokemon?limit=20&offset=${offset}`)
    .then((data) => data.data);
};

export default getAllPokemon;
