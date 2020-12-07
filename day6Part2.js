// --- Part Two ---
// As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

// You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

// Using the same example as above:

// abc

// a
// b
// c

// ab
// ac

// a
// a
// a
// a

// b
// This list represents answers from five groups:

// In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
// In the second group, there is no question to which everyone answered "yes".
// In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
// In the fourth group, everyone answered yes to only 1 question, a.
// In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.
// In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.

// For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

var fs = require('fs') 
var input = fs.readFileSync("./day6Input.txt").toString().split("\r\n\r\n")

const getUniqueAnswers = (groupAnswers1, groupAnswers2) => {
  let length1 = groupAnswers1.length
  let length2 = groupAnswers2.length
  var commonAnswers = []
  if (length1 <= length2) {
    for (let i = 0; i < groupAnswers1.length; i++) {
      for (let j = 0; j < groupAnswers2.length; j++) {
        if (groupAnswers1[i] === groupAnswers2[j]) {
          commonAnswers.push(groupAnswers1[i])
          break;
        }
      }
    }
  } else {
    for (let i = 0; i < groupAnswers1.length; i++) {
      for (let j = 0; j < groupAnswers2.length; j++) {
        if (groupAnswers1[i] === groupAnswers2[j]) {
          commonAnswers.push(groupAnswers1[i])
          break;
        }
      }
    }
  }
  return commonAnswers.join('')
}
// console.log(getUniqueAnswers('hxcq', 'xq'))

const something = (something1) => {
  var common = []
  something1 = something1.split("\r\n")
  if (something1.length === 1) {
    return something1[0].length
  } else if (something1.length === 2) {
    return (getUniqueAnswers(something1[0], something1[1])).length
  } else {
    var some = something1[0]
    for (let i = 1; i < something1.length; i++) {
      some = getUniqueAnswers(some, something1[i])
    }
  }
  // console.log(some.length)
  return some.length
}

// console.log(something(input[1]))

const getSumOfCommonAnswers = (groupCommonAnswers) => {
  let sum = 0
  for (let i = 0; i < groupCommonAnswers.length; i++) {
    sum += groupCommonAnswers[i]
  }
  return sum
}

const getAllCommonAnswers = (group) => {
  let answersArray = []
  for (let i = 0; i < group.length; i++) {
    answersArray.push(something(input[i]))
  }
  console.log(answersArray)
  return getSumOfCommonAnswers(answersArray)
}

console.log(getAllCommonAnswers(input)) // 3473 --> Correct Answer!

// getUniqueAnswers(input[0].split('\r\n').join(''))
// console.log('----------------')
// getUniqueAnswers(input[1].split('\r\n').join(''))
// console.log('----------------')
// getUniqueAnswers(input[2].split('\r\n').join(''))
// console.log('----------------')
// getUniqueAnswers(input[3].split('\r\n').join(''))

// console.log(getAllCommonAnswers(input))
// console.log(input[0].split('\r\n'))