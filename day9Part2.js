// --- Part Two ---
// The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

// Again consider the above example:

// 35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576
// In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

// To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

// What is the encryption weakness in your XMAS-encrypted list of numbers?

var fs = require('fs')
var input = fs.readFileSync("./day9Input.txt").toString().split("\r\n")
var data = []
for (let i = 0; i < input.length; i++) {
  data.push(parseInt(input[i]))
}
var test = [35,
            20,
            15,
            25,
            47,
            40,
            62,
            55,
            65,
            95,
            102,
            117,
            150,
            182,
            127,
            219,
            299,
            277,
            309,
            576]

const sum = (array) => {
  let ans = array.reduce(function(a,b) {
    return a + b
  }, 0)
  return ans
} 

const findContiguousTarget = (list, target, windowSize) => {
  for (let i = 0; i < list.length - windowSize; i++) {
    if (sum(list.slice(i, i+windowSize)) === target) {
      console.log('We found it boys!')
      let contiguous = list.slice(i, i+windowSize)
      let max = Math.max(...contiguous)
      let min = Math.min(...contiguous)
      let sumOfMaxMin = max + min
      console.log(`i: ${i} -- windowSize: ${i+windowSize} -- array: ${contiguous} -- max: ${max} -- min: ${min} -- sumOfMaxMin: ${sumOfMaxMin}`)
      return sumOfMaxMin
    }
  }
  console.log(`Didn't find it with window size ${windowSize}`)
  return -1
}

const findInvalidNumber = (list, preamble) => {
  let myList = new Array(preamble)
  let mySet = new Set()
  for (let i = 0; i < preamble; i++) {
    myList[i] = (list[i])
    mySet.add(list[i])
  }
  for (let i = preamble; i < list.length; i++) {
    if (validNumberChecker(myList, mySet, list[i]) === true) {
      mySet.delete(myList.shift())
      myList.push(list[i])
      mySet.add(list[i])
    } else {
      console.log(`Failed -- list[i]: ${list[i]}`)
      return list[i]
    }
  }
}

const validNumberChecker = (list, set, number) => {
  for (let i = 0; i < list.length; i++) {
    let diff = number - list[i]
    if (set.has(diff)) {
      return true
    }
  }
  return false
}

const encryptionWeakness = (list, preamble) => {
  let invalid = findInvalidNumber(list, preamble)
  console.log(invalid)
  for (let i = 2; i < list.length; i++) {
    let checker = findContiguousTarget(list, invalid, i)
    if (checker !== -1) {
      return checker
    }
  }
}

encryptionWeakness(data, 25)
