const { input } = require("./input");

const program = (input) => {
  let running = true, index = 0, accumulator = 0, didTerminateCorrectly = false;
  const visits = [];

  const preventInfiniteLoops = (index) => {
    if (visits.find((v) => v === index)) {
      running = false;
    } else {
      visits.push(index);
    }
  };
  const isProgramFinished = (index) => {
    if (index === input.length) {
      running = false;
      didTerminateCorrectly = true;
    }
  };

  while (running) {
    const [instruction, instructionInput] = input[index];
    switch (instruction) {
      case "nop": {
        index += 1;
        break;
      }
      case "acc": {
        accumulator += instructionInput;
        index += 1;
        break;
      }
      case "jmp": {
        index += instructionInput;
        break;
      }
      default: {
        throw new Error("Unexpected instruction: " + instruction);
      }
    }
    preventInfiniteLoops(index);
    isProgramFinished(index);
  }
  return didTerminateCorrectly ? accumulator : -1;
};

const getAllIndexes = (arr, val) => {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i][0] === val) indexes.push(i);
  }
  return indexes;
};

const bruteForcer = (indexes, toTry) => {
  let winner = -1;
  indexes.every((index) => {
    const temp = [...input];
    const [_, instructionInput] = temp[index];
    temp[index] = [toTry, instructionInput];
    const output = program(temp);
    if (output > -1) winner = output;
    return output === -1;
  });
  return winner;
};
const jmps = getAllIndexes(input, "jmp");
const nops = getAllIndexes(input, "nop");

const test1 = bruteForcer(jmps, "nop");
if (test1 > -1) {
  console.log(test1);
} else console.log(bruteForcer(nops, "jmp"));
