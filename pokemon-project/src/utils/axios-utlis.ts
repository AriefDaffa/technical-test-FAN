import axios from 'axios';

const baseAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default baseAPI;
