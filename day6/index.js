const { input } = require("./input");

const countAnyYesAnswers = (group) =>
  group.reduce((prev, current) => {
    const memberAnwsers = current.split("");
    memberAnwsers.forEach((a) => {
      if (!prev.includes(a)) prev.push(a);
    });
    return prev;
  }, []).length;

const countAllYesAnswers = (group) =>
  group.reduce((prev, current, index) => {
    const memberAnwsers = current.split("");

    if (index == 0) return memberAnwsers;

    const temp = [];
    memberAnwsers.forEach((a) => {
      if (prev.includes(a)) temp.push(a);
    });

    return temp;
  }, []).length;

//console.log(input.map(countAnyYesAnswers).reduce((a, b) => a + b, 0));
console.log(input.map(countAllYesAnswers).reduce((a, b) => a + b, 0));
