const { input } = require("./input");

const trees = [];
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

slopes.forEach(([right, down], slopeIndex) => {
  let slopeTrees = 0;
  let x = 0;

  for (let index = 0; index < input.length; index += down) {
    const row = input[index];
    if (index > 0) {
      if (row[x] === "#") {
        slopeTrees++;
      }
    }
    x += right;
  }
  trees[slopeIndex] = slopeTrees;
});

console.log(
  trees,
  trees.reduce((p, c) => p * c)
);
