// --- Part Two ---
// While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

// The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

// Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

// Given the same example list from above:

// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
// How many passwords are valid according to the new interpretation of the policies?

var count = 0
// Does all the checking in one pass. This assumes the file is formatted correctly starting with "minCount-maxCount requiredChar: password"
const isPasswordValid = (string) => {
  let firstIndex = 0
  let secondIndex = 0
  let startSecondIndex = 0
  let requiredChar = ''
  let password = ''
  let idx = 0
  
  // finds firstIndex
  while (string[idx] != '-') {
    idx += 1
  }
  if (idx === 1) {
    firstIndex = string[0]
  } else {
    firstIndex = string.slice(0, idx)
  }

  // finds secondIndex
  idx += 1
  startSecondIndex = idx
  while (string[idx] != ' ') {
    idx += 1
  }
  if (idx === (startSecondIndex + 1)) {
    secondIndex = string[startSecondIndex]
  } else {
    secondIndex = string.slice(startSecondIndex, idx)
  }

  // finds requiredChar
  idx += 1
  requiredChar = string[idx]

  // copies password
  idx += 2
  while (idx != string.length) {
    password += string[idx]
    idx += 1
  }

  // checks if password is valid with criteria
  if (password[firstIndex] === password[secondIndex]) {
    
  } else if (password[firstIndex] == requiredChar || password[secondIndex] === requiredChar) {
    count += 1
  }

  // logs everything for validating
  // console.log(`firstIndex: ${firstIndex} -- secondIndex: ${secondIndex} -- char: ${requiredChar} -- password: ${password} -- first: ${password[firstIndex]} -- second: ${password[secondIndex]} -- count: ${count}`)
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