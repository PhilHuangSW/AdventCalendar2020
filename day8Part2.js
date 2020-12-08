// --- Part Two ---
// After some careful analysis, you believe that exactly one instruction is corrupted.

// Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)

// The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one jmp or nop, you can repair the boot code and make it terminate correctly.

// For example, consider the same program from above:

// nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6
// If you change the first instruction from nop +0 to jmp +0, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the jmp instructions, the program will still eventually find another jmp instruction and loop forever.

// However, if you change the second-to-last instruction (from jmp -4 to nop -4), the program terminates! The instructions are visited in this order:

// nop +0  | 1
// acc +1  | 2
// jmp +4  | 3
// acc +3  |
// jmp -3  |
// acc -99 |
// acc +1  | 4
// nop -4  | 5
// acc +6  | 6
// After the last instruction (acc +6), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value 8 (acc +1, acc +1, acc +6).

// Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?

var fs = require('fs')
var input = fs.readFileSync("./day8Input.txt").toString().split("\r\n")
var data = []

const arrayifyInput = (array, finalArray) => {
  for (let i = 0; i < array.length; i++) {
    let temp = []
    temp.push(array[i].slice(0, 3))
    temp.push(parseInt(array[i].slice(4, array[i].length)))
    finalArray.push(temp)
  }
}

arrayifyInput(input, data)
// console.log(data[0])

var test = ["nop +0",
            "acc +1",
            "jmp +4",
            "acc +3",
            "jmp -3",
            "acc -99",
            "acc +1",
            "jmp -4",
            "acc +6"]

var testArray = []
arrayifyInput(test, testArray)
// console.log(testArray[0])

const checkCyclic = (instructions) => {
  var accumulator = 0
  var idx = 0
  var seen = new Set()
  while (idx < instructions.length) {
    let instruct = instructions[idx][0]
    // console.log(`instruct: ${instruct} -- idx: ${idx} -- instructions[idx]: ${instructions[idx]} -- acc: ${accumulator}`)
    if (seen.has(idx)) {
      return true
    } else {
      seen.add(idx)
    }
    switch (instruct) {
      case 'nop':
        idx += 1
        break
      case 'acc':
        accumulator += instructions[idx][1]
        idx += 1
        break
      case 'jmp':
        idx += instructions[idx][1]
        break
      default:
        idx += 1
    }
  }
  return false
}

// console.log(checkCyclic(testArray))

const findTerminator = (instructions) => {
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i][0] === 'jmp') {
      instructions[i][0] = 'nop'
      // console.log(instructions)
      if (checkCyclic(instructions) === false) {
        console.log(`instructions[i]: ${instructions[i]} -- i: ${i}`)
        console.log('We found it boys!')
        break
      } else {
        instructions[i][0] = 'jmp'
        // console.log(instructions)
      }
    }
    if (instructions[i][0] === 'nop') {
      instructions[i][0] = 'jmp'
      if (checkCyclic(instructions) === false) {
        console.log(`instructions[i]: ${instructions[i]} -- i: ${i}`)
        console.log('We found it boys!')
        break
      } else {
        instructions[i][0] = 'nop'
      }
    }
  }
}

// findTerminator(data)  
// --------------------------
// Terminator found instruction at i: 321
// jmp -273
// change jmp -273 --> nop -273
// runs through completion
// --------------------------

const run = (instructions) => {
  var accumulator = 0
  var idx = 0
  var seen = new Set()
  while (idx < instructions.length) {
    if (seen.has(idx)) {
      console.log('----- ' + accumulator + ' -----')
      break
    } else {
      seen.add(idx)
    }
    switch(instructions[idx][0]) {
      case 'nop':
        idx += 1
        break
      case 'acc':
        accumulator += instructions[idx][1]
        idx += 1
        break
      case 'jmp':
        idx += instructions[idx][1]
        break
      default: 
        idx += 1
        break
    }
  }
  console.log('Ran without issue')
  console.log(`accumulator: ${accumulator}`)
}

run(data)  // 2304 --> Correct Answer!