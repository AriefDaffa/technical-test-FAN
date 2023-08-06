// Uncomment this value to test the output
// const testCase1 = 'Saat meng*ecat tembok, Agung dib_antu oleh Raihan.';
// const testCase2 = 'Berapa u(mur minimal[ untuk !mengurus ktp?';
// const testCase3 = 'Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.';

const countWords = (words) => {
  //declare special characters
  const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|<>\/~]/;

  //split the array by space
  const splittedArr = words.split(' ');

  // use filter and test function to filter the words that contains special characters
  const filteredArr = splittedArr.filter((item) => !specialChars.test(item));

  // return the length of a filtered array
  return filteredArr.length;
};

// Uncomment this value to test the output
// console.log(countWords(testCase1));
// console.log(countWords(testCase2));
// console.log(countWords(testCase3));
