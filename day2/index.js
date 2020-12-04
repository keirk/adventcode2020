const { input } = require("./input");

//console.log(input);
let valid = 0;
input.forEach(([regex, password]) => {
  //   const pattern = `[(${regex[1]}).*]{${regex[0]}}`;

  //   if (new RegExp(pattern, "g").test(password)) {
  //     //console.log(pattern, password);
  //     valid++;
  //   } else {
  //     console.log(pattern, password);
  //   }
  const [first, second] = regex[0].split(",").map((i) => parseInt(i, 10) - 1);
  const letter = regex[1];
  //const stripped = password.replace(new RegExp(`[^{${regex[1]}}]+`, "g"), "");
  //console.log(stripped, stripped.length, min, max);
  const firstOrSecondMatch =
    password[first] == letter || password[second] == letter;
  const bothMatch = password[first] == letter && password[second] == letter;
  if (firstOrSecondMatch && !bothMatch) {
    console.log(firstOrSecondMatch, bothMatch, password, first, second, letter);
    valid++;
  }
});

console.log(input.length, valid);
