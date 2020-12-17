// --- Part Two ---
// Impressed, the Elves issue you a challenge: determine the 30000000th number spoken. For example, given the same starting numbers as above:

// Given 0,3,6, the 30000000th number spoken is 175594.
// Given 1,3,2, the 30000000th number spoken is 2578.
// Given 2,1,3, the 30000000th number spoken is 3544142.
// Given 1,2,3, the 30000000th number spoken is 261214.
// Given 2,3,1, the 30000000th number spoken is 6895259.
// Given 3,2,1, the 30000000th number spoken is 18.
// Given 3,1,2, the 30000000th number spoken is 362.
// Given your starting numbers, what will be the 30000000th number spoken?

var fs = require('fs')
var input = fs.readFileSync("./Day15Input.txt").toString().split(",")
var data = []
for (let i = 0; i < input.length; i++) {
  data.push(parseInt(input[i]))
}
var test = [0,3,6]

const findPrevious = (gameNumbers, sameNumber, startingIndex) => {
  for (let i = startingIndex; i >= 0; i--) {
    if (gameNumbers[i] === sameNumber) {
      return i
    }
  }
}

const numAtTurn = (turn, startingNumbers) => {
  let gameNumbers = new Array(turn)
  let lastIndex = {}
  for (let i = 0; i < startingNumbers.length; i++) {
    gameNumbers[i] = startingNumbers[i]
  }
  let gameSet = new Set()
  for (let i = 0; i < startingNumbers.length-1; i++) {
    gameSet.add(startingNumbers[i])
    lastIndex[startingNumbers[i]] = i
  }
  // console.log(lastIndex)
  for (let i = startingNumbers.length; i < turn; i++) {
    // console.log(gameNumbers[i-1])
    if (gameSet.has(gameNumbers[i-1])) {
      gameNumbers[i] = (i-1) - lastIndex[gameNumbers[i-1]]
      lastIndex[gameNumbers[i-1]] = i - 1
    } else {
      gameNumbers[i] = 0
      gameSet.add(gameNumbers[i-1])
      lastIndex[gameNumbers[i-1]] = i - 1
    }
    // console.log(gameNumbers)
    // console.log(lastIndex)
  }
  return gameNumbers[gameNumbers.length-1]
}

console.log(numAtTurn(30000000, data))  // 323780 --> Correct Answer!