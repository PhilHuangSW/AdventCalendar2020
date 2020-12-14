// --- Day 12: Rain Risk ---
// Your ferry made decent progress toward the island, but the storm came in faster than anyone expected. The ferry needs to take evasive actions!

// Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route directly to safety, it produced extremely circuitous instructions. When the captain uses the PA system to ask if anyone can help, you quickly volunteer.

// The navigation instructions (your puzzle input) consists of a sequence of single-character actions paired with integer input values. After staring at them for a few minutes, you work out what they probably mean:

// Action N means to move north by the given value.
// Action S means to move south by the given value.
// Action E means to move east by the given value.
// Action W means to move west by the given value.
// Action L means to turn left the given number of degrees.
// Action R means to turn right the given number of degrees.
// Action F means to move forward by the given value in the direction the ship is currently facing.
// The ship starts by facing east. Only the L and R actions change the direction the ship is facing. (That is, if the ship is facing east and the next instruction is N10, the ship would move north 10 units, but would still move east if the following action were F.)

// For example:

// F10
// N3
// F7
// R90
// F11
// These instructions would be handled as follows:

// F10 would move the ship 10 units east (because the ship starts by facing east) to east 10, north 0.
// N3 would move the ship 3 units north to east 10, north 3.
// F7 would move the ship another 7 units east (because the ship is still facing east) to east 17, north 3.
// R90 would cause the ship to turn right by 90 degrees and face south; it remains at east 17, north 3.
// F11 would move the ship 11 units south to east 17, south 8.
// At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its east/west position and its north/south position) from its starting position is 17 + 8 = 25.

// Figure out where the navigation instructions lead. What is the Manhattan distance between that location and the ship's starting position?

var fs = require('fs')
var input = fs.readFileSync("./day12Input.txt").toString().split("\r\n")
var test = ['F10','N3','F7','R90','F11']

const datify = (array) => {
  let dataArray = []
  for (let i = 0; i < array.length; i++) {
    let direction = []
    direction.push(array[i][0])
    direction.push(parseInt(array[i].slice(1,array[i].length)))
    dataArray.push(direction)
  }
  return dataArray
} 

test = datify(test)
data = datify(input)

const manhattanDistance = (directions) => {
  let compass = ['N', 'E', 'S', 'W']
  let facing = 1
  let east = 0
  let west = 0
  let north = 0
  let south = 0
  for (let i = 0; i < directions.length; i++) {
    switch(directions[i][0]) {
      case 'E':
        if (west === 0) {
          east += directions[i][1]
        } else {
          let eastDiff = west - directions[i][1]
          if (eastDiff < 0) {
            east += Math.abs(eastDiff)
            west = 0
          } else if (eastDiff === 0) {
            west = 0
          } else {
            west = eastDiff
          }
        }
        break;
      case 'W':
        if (east === 0) {
          west += directions[i][1]
        } else {
          let westDiff = east - directions[i][1]
          if (westDiff < 0) {
            west += Math.abs(westDiff)
            east = 0
          } else if (westDiff === 0) {
            east = 0
          } else {
            east = westDiff
          }
        }
        break;
      case 'N':
        if (south === 0) {
          north += directions[i][1]
        } else {
          let northDiff = south - directions[i][1]
          if (northDiff < 0) {
            north += Math.abs(northDiff)
            south = 0
          } else if (northDiff === 0) {
            south = 0
          } else {
            south = northDiff
          }
        }
        break;
      case 'S':
        if (north === 0) {
          south += directions[i][1]
        } else {
          let southDiff = north - directions[i][1]
          if (southDiff < 0) {
            south += Math.abs(southDiff)
            north = 0
          } else if (southDiff === 0) {
            north = 0
          } else {
            north = southDiff
          }
        }
        break;
      case 'R':
        let degreesRight = (directions[i][1]%360)
        if (degreesRight === 90) {
          facing += 1
          facing %= 4
        } else if (degreesRight === 180) {
          facing += 2
          facing %= 4
        } else if (degreesRight === 270) {
          facing += 3
          facing %= 4
        }
        break;
      case 'L':
        let degreesLeft = (directions[i][1]%360)
        if (degreesLeft === 90) {
          facing += 3
          facing %= 4
        } else if (degreesLeft === 180) {
          facing += 2
          facing %= 4
        } else if (degreesLeft === 270) {
          facing += 1
          facing %= 4
        }
        break;
      default:
        if (compass[facing] === 'N') {
          if (south === 0) {
            north += directions[i][1]
          } else {
            let northDiff = south - directions[i][1]
            if (northDiff < 0) {
              north += Math.abs(northDiff)
              south = 0
            } else if (northDiff === 0) {
              south = 0
            } else {
              south = northDiff
            }
          }
        } else if (compass[facing] === 'E') {
          if (west === 0) {
            east += directions[i][1]
          } else {
            let eastDiff = west - directions[i][1]
            if (eastDiff < 0) {
              east += Math.abs(eastDiff)
              west = 0
            } else if (eastDiff === 0) {
              west = 0
            } else {
              west = eastDiff
            }
          }
        } else if (compass[facing] === 'S') {
          if (north === 0) {
            south += directions[i][1]
          } else {
            let southDiff = north - directions[i][1]
            if (southDiff < 0) {
              south += Math.abs(southDiff)
              north = 0
            } else if (southDiff === 0) {
              north = 0
            } else {
              north = southDiff
            }
          }
        } else {
          if (east === 0) {
            west += directions[i][1]
          } else {
            let westDiff = east - directions[i][1]
            if (westDiff < 0) {
              west += Math.abs(westDiff)
              east = 0
            } else if (westDiff === 0) {
              east = 0
            } else {
              east = westDiff
            }
          }
        }
        break;
    }
    console.log(`north: ${north} -- east: ${east} -- south: ${south} -- west: ${west}`)
  }
  return (north + east + south + west)
}

console.log(manhattanDistance(data))  // 1645 --> Correct Answer!