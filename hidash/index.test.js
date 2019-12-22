//
//
const assert = require('assert');
const { forEach, map } = require('./index');

// const test = (desc, fn) => {
//   console.log('----', desc, '----');
//   try {
//     fn();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

it('The forEach function', () => {
  let sum = 0;
  forEach([1, 2, 3], value => {
    sum += value;
  });

  assert.strictEqual(sum, 6, 'Expected forEach to sum the array');

  // if (sum !== 6) {
  //   throw new Error(' Expected sum to equal 6');
  // }
});

it('The Map Function', () => {
  const result = map([1, 2, 3], value => {
    return value * 2;
  });

  assert.strictEqual(result[0], 2);
  assert.strictEqual(result[1], 4);
  assert.strictEqual(result[2], 6);

  // if (result[0] !== 2) {
  //   throw new Error(`Expected to find 2, but found ${result[0]}`);
  // }
  // if (result[1] !== 4) {
  //   throw new Error(`Expected to find 4, but found ${result[0]}`);
  // }
  // if (result[2] !== 6) {
  //   throw new Error(`Expected to find 6, but found ${result[0]}`);
  // }
});
