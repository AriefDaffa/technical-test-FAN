export interface PokemonResults {
  name: string;
  url: string;
}

export interface AllPokemonTypes {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonResults[];
}
