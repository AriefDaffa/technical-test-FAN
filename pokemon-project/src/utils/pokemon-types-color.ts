const pokemonTypesColor = (type: string) => {
  switch (type) {
    case 'normal':
      return 'bg-[#A8A579]';
    case 'fighting':
      return 'bg-[#C0302A]';
    case 'flying':
      return 'bg-[#98A5E0]';
    case 'poison':
      return 'bg-[#BA5B9F]';
    case 'ground':
      return 'bg-[#E4D6A9]';
    case 'rock':
      return 'bg-[#E4D6A9]';
    case 'bug':
      return 'bg-[#A9BD42]';
    case 'ghost':
      return 'bg-[#6662B1]';
    case 'steel':
      return 'bg-[#AEADC2]';
    case 'fire':
      return 'bg-[#FD4932]';
    case 'water':
      return 'bg-[#1F93F6]';
    case 'grass':
      return 'bg-[#72D86B]';
    case 'electric':
      return 'bg-[#FDC544]';
    case 'psychic':
      return 'bg-[#FE6FA2]';
    case 'ice':
      return 'bg-[#46CEE4]';
    case 'dragon':
      return 'bg-[#8566EE]';
    case 'dark':
      return 'bg-[#755A4D]';
    case 'fairy':
      return 'bg-[#FCB7F3]';
    case 'unknown':
      return 'bg-[#AEADC2]';
    case 'shadow':
      return 'bg-[#AEADC2]';
    default:
      return '';
  }
};

export default pokemonTypesColor;
