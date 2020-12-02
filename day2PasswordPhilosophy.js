// --- Day 2: Password Philosophy ---
// Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

// The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

// Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

// To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

// For example, suppose you have the following list:

// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
// Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

// In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

// How many passwords are valid according to their policies?

var count = 0
// Does all the checking in one pass. This assumes the file is formatted correctly starting with "minCount-maxCount requiredChar: password"
const isPasswordValid = (string) => {
  let minCount = 0
  let maxCount = 0
  let startMax = 0
  let requiredChar = ''
  let idx = 0
  let charCount = 0
  while (string[idx] != '-') {
    idx += 1
  }
  if (idx === 1) {
    minCount = string[0]
  } else {
    minCount = string.slice(0, idx)
  }
  idx += 1
  startMax = idx
  while (string[idx] != ' ') {
    idx += 1
  }
  if (idx === (startMax + 1)) {
    maxCount = string[startMax]
  } else {
    maxCount = string.slice(startMax, idx)
  }
  idx += 1
  requiredChar = string[idx]
  idx += 2
  while (idx != string.length) {
    if (string[idx] == requiredChar) {
      charCount += 1
    }
    idx += 1
  }
  if (charCount >= minCount && charCount <= maxCount) {
    count += 1
  }
  // console.log(`min: ${minCount} -- max: ${maxCount} -- char: ${requiredChar} -- count: ${charCount}`)
}

var fs = require('fs');
var input = fs.readFileSync("./day2Input.txt").toString().split('\n');

input.forEach(password => isPasswordValid(password));
console.log(count);

// const in1 = "1-3 a: abcde"
// const in2 = "1-3 b: cdefg"
// const in3 = "2-9 c: ccccccccc"
// isPasswordValid(in1)
// isPasswordValid(in2)
// isPasswordValid(in3)
// console.log(count)

//////////////////// FIRST ATTEMPT ////////////////////

// const input = "1-3 a: abcde";
// var minCount = 0;
// var maxCount = 0;
// var requiredChar = '';

// Search through the string to get the minimum number the required character has to show up in password
// const getMinCount = (string) => {
//   let count = 1;
//   let idx = 1;
//   while (string[idx] != '-') {
//     count += 1;
//     idx += 1;
//   }
//   if (count === 1) {
//     return string[0];
//   } else {
//     return string.slice(0,count);
//   }
// }
// // minCount = getMinCount(input);
// // console.log(minCount);

// // Search through the string to get the maximum number the required character can show up in password
// const getMaxCount = (string) => {
//   let start = 0;
//   let count = 0;
//   let idx = 1;
//   while (string[idx] != ' ') {
//     if (string[idx] == '-') {
//       count += 1;
//       idx += 1;
//       start = idx;
//     }
//     count += 1;
//     idx += 1;
//   }
//   if (count === 1) {
//     return string[start]
//   } else {
//     return string.slice(start, start+count)
//   }
// }
// // maxCount = getMaxCount(input);
// // console.log(maxCount);

// // Search through the string to get the required character in password
// const getRequiredChar = (string) => {
//   let regex = RegExp(/[a-z]/)
//   let arr = string.match(regex)
//   return arr[0]
// }
// // requiredChar = getRequiredChar(input);
// // console.log(requiredChar);

// // Iterate through the string and return true if password is valid, false otherwise
// const validPassword = (string, minCount, maxCount, requiredChar) => {
//   let idx = 0
//   while (string[idx] != ':') {
//     idx += 1
//   }
//   idx += 1
//   let count = 0
//   while (idx != string.length) {
//     if (string[idx] === requiredChar) {
//       count += 1
//     }
//     idx += 1
//   }
//   if (count >= minCount && count <= maxCount) {
//     return true
//   } else {
//     return false
//   }
// }
// // console.log(validPassword(input, minCount, maxCount, requiredChar));

// var count = 0
// const isValid = (string) => {
//   let minCount = getMinCount(string);
//   let maxCount = getMaxCount(string);
//   let requiredChar = getRequiredChar(string);
//   if (validPassword(string, minCount, maxCount, requiredChar) === true) {
//     count += 1
//   }
//   return count
// }

// var fs = require('fs');
// var input = fs.readFileSync("./day2Input.txt").toString().split('\n');

// const h = '1-3 b: cdefg'

// input.forEach(password => isValid(password));
// console.log(count);
// console.log(isValid(h))




