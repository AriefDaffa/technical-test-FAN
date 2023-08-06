// Uncomment this value to test the output
// const testCase1 = [10, 20, 20, 10, 10, 30, 50, 10, 20];
// const testCase2 = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5];
// const testCase3 = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3];

const countSocks = (socksArr) => {
  // sort the array
  const sortedSocks = socksArr.sort();

  // declare result variable
  let result = 0;

  // create nested loop
  for (let i = 0; i < sortedSocks.length; i++) {
    for (let j = 0; j < i; j++) {
      // check if there is a duplicate, add value to result,
      // break the loop and go to the next iteration (i + 1)
      if (sortedSocks[i] === sortedSocks[j]) {
        result++;
        i++;
        break;
      }
    }
  }

  return result;
};

// Uncomment this value to test the output
// console.log(countSocks(testCase1));
// console.log(countSocks(testCase2));
// console.log(countSocks(testCase3));
