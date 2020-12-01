const { input } = require("./inputs");

const target = 2020;

function* loop() {
  for (let i = 0; i < input.length; i++) {
    yield input[i];
  }
}

let output = 0;

for (let x of loop()) {
  for (let y of loop()) {
    for (let z of loop()) {
      if (x + y + z == target) {
        output = x * y * z;
        break;
      }
    }
    if (output > 0) break;
  }
  if (output > 0) break;
}

console.log(output);
