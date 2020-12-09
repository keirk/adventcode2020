const { input } = require("./input");

function* loop(values) {
  for (let i = 0; i < values.length; i++) {
    yield values[i];
  }
}

const except = (values, index) => {
  const i = values.slice(0, index);
  const ii = values.slice(index + 1);
  return [...i, ...ii];
};
const checkIfValid = (num, values) => {
  let valid = false;
  values.every((value, index) => {
    for (let y of loop(except(values, index))) {
      if (y + value == num) {
        valid = true;
        break;
      }
    }
    return !valid;
  });
  return valid;
};
const breakXmasPart1 = (input, preambleLength) => {
  for (let i = preambleLength; i < input.length; i++) {
    const element = input[i];
    if (!checkIfValid(element, input.slice(i - preambleLength, i))) {
      return element;
    }
  }
};

const calcXmasWeakness = (input) => {
  const sorted = input.sort((a, b) => {
    return a - b;
  });
  const [first] = sorted;
  const [last] = sorted.reverse();
  return first + last;
};

const breakXmasPart2 = (input, numToFind) => {
  let runningTotal = [];
  let startAt = 0;
  while (startAt <= input.length) {
    for (let index = startAt; index <= input.length; index++) {
      const element = input[index];
      runningTotal.push(element);
      // if we've only one element - continue
      if (runningTotal.length === 1) continue;

      const runningTotalTotal = runningTotal.reduce((a, b) => a + b);
      // if we are still looking, continue
      if (runningTotalTotal < numToFind) {
        continue;
      }
      // bingo!
      if (runningTotalTotal === numToFind) {
        return calcXmasWeakness(runningTotal);
      }

	  //we are bust, move the startAt position, 
	  // reset the running total and start again
      startAt++;
      runningTotal = [];
      break;
    }
  }
};

const num = breakXmasPart1(input, 25);
console.log("PART1", num);
console.log("PART2:", breakXmasPart2(input, num));
