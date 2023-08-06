import baseAPI from '@/utils/axios-utlis';

const getPokemonByKeyword = async (keyword: string) => {
  return await baseAPI.get(`pokemon/${keyword}`).then((data) => data.data);
};

export default getPokemonByKeyword;
