const { input } = require("./input");

const isLower = (instruction) => instruction === "F" || instruction === "L";

const instructionsToRangePosition = (instructions, [min, max]) => {
  if (instructions.length === 1) {
    return isLower(instructions[0]) ? min : max;
  }
  const nextInstruction = instructions.shift();
  const mid = isLower(nextInstruction)
    ? Math.floor((min + max) / 2)
    : Math.ceil((min + max) / 2);
  const newRange = isLower(nextInstruction) ? [min, mid] : [mid, max];
  return instructionsToRangePosition(instructions, newRange);
};

const calculateSeatPosition = (instructions) => {
  const row = instructionsToRangePosition(
    instructions.substring(0, 7).split(""),
    [0, 127]
  );
  const seat = instructionsToRangePosition(
    instructions.substring(7, 10).split(""),
    [0, 7]
  );
  return row * 8 + seat;
};

const seats = input.map(calculateSeatPosition).sort((a, b) => a - b);

const mySeat =
  seats.find((v, i) => {
    const prev = seats[i - 1];
    return i > 0 && v - 1 !== prev && v === prev + 2;
  }) - 1;
console.log(mySeat);
