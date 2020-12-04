const { input } = require("./input");

const hasRequiredKeys = (passport) =>
  ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every((key) =>
    Object.keys(passport).includes(key)
  );
const int = (v) => parseInt(v, 10);
const byr = (v) => v >= 1920 && v <= 2002;
const iyr = (v) => v >= 2010 && v <= 2020;
const eyr = (v) => v >= 2020 && v <= 2030;
const hgt = (v) => {
  if (v.indexOf("cm") < 0 && v.indexOf("in") < 0) return false;
  if (v.indexOf("in") >= 0) {
    const h = parseInt(v.replace("in", ""), 10);
    return h >= 59 && h <= 76;
  } else {
    const h = parseInt(v.replace("cm", ""), 10);
    return h >= 150 && h <= 193;
  }
};
const hcl = (v) => /[0-9A-Fa-f]{6}/g.test(v.substring(1));
const pid = (v) => v.length === 9;
const ecl = (v) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some((e) => e === v);

const isValidPassport = (passport) =>
  hasRequiredKeys(passport) &&
  byr(int(passport.byr)) &&
  iyr(int(passport.iyr)) &&
  eyr(int(passport.eyr)) &&
  hgt(passport.hgt) &&
  hcl(passport.hcl) &&
  ecl(passport.ecl) &&
  pid(passport.pid);

console.log(input.filter(isValidPassport).length, input.length);
