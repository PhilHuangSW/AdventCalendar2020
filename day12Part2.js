// --- Part Two ---
// Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

// Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

// Action N means to move the waypoint north by the given value.
// Action S means to move the waypoint south by the given value.
// Action E means to move the waypoint east by the given value.
// Action W means to move the waypoint west by the given value.
// Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
// Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
// Action F means to move forward to the waypoint a number of times equal to the given value.
// The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

// For example, using the same instructions as above:

// F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north), leaving the ship at east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
// N3 moves the waypoint 3 units north to 10 units east and 4 units north of the ship. The ship remains at east 100, north 10.
// F7 moves the ship to the waypoint 7 times (a total of 70 units east and 28 units north), leaving the ship at east 170, north 38. The waypoint stays 10 units east and 4 units north of the ship.
// R90 rotates the waypoint around the ship clockwise 90 degrees, moving it to 4 units east and 10 units south of the ship. The ship remains at east 170, north 38.
// F11 moves the ship to the waypoint 11 times (a total of 44 units east and 110 units south), leaving the ship at east 214, south 72. The waypoint stays 4 units east and 10 units south of the ship.
// After these operations, the ship's Manhattan distance from its starting position is 214 + 72 = 286.

// Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location and the ship's starting position?

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
  let waypoint = [['N', 1],['E', 10],['S', 0],['W', 0]]
  let north = 0
  let east = 0
  let south = 0
  let west = 0
  for (let i = 0; i < directions.length; i++) {
    switch(directions[i][0]) {
      case 'N':
        waypoint[0][1] += directions[i][1]
        break
      case 'E':
        waypoint[1][1] += directions[i][1]
        break
      case 'S':
        waypoint[2][1] += directions[i][1]
        break
      case 'W':
        waypoint[3][1] += directions[i][1]
        break
      case 'L':
        let degreesLeft = (directions[i][1]%360)
        let nL = waypoint[0][1]
        let eL = waypoint[1][1]
        let sL = waypoint[2][1]
        let wL = waypoint[3][1]
        if (degreesLeft === 90) {
          waypoint[0][1] = eL
          waypoint[1][1] = sL
          waypoint[2][1] = wL
          waypoint[3][1] = nL
        } else if (degreesLeft === 180) {
          waypoint[0][1] = sL
          waypoint[1][1] = wL
          waypoint[2][1] = nL
          waypoint[3][1] = eL
        } else if (degreesLeft === 270) {
          waypoint[0][1] = wL
          waypoint[1][1] = nL
          waypoint[2][1] = eL
          waypoint[3][1] = sL
        }
        break
      case 'R':
        let degreesRight = (directions[i][1]%360)
        let nR = waypoint[0][1]
        let eR = waypoint[1][1]
        let sR = waypoint[2][1]
        let wR = waypoint[3][1]
        if (degreesRight === 90) {
          waypoint[0][1] = wR
          waypoint[1][1] = nR
          waypoint[2][1] = eR
          waypoint[3][1] = sR
        } else if (degreesRight === 180) {
          waypoint[0][1] = sR
          waypoint[1][1] = wR
          waypoint[2][1] = nR
          waypoint[3][1] = eR
        } else if (degreesRight === 270) {
          
          waypoint[0][1] = eR
          waypoint[1][1] = sR
          waypoint[2][1] = wR
          waypoint[3][1] = nR
        }
        break
      default: 
        let forwardDirections = []
        for (let j = 0; j < waypoint.length; j++) {
          // console.log(`waypoint[${j}][1]: ${waypoint[j][1]} -- directions[${i}][1]: ${directions[i][1]}`)
          forwardDirections.push(waypoint[j][1] * directions[i][1])
        }
        for (let k = 0; k < forwardDirections.length; k++) {
          if (k === 0) {
            if (south === 0) {
              north += forwardDirections[k]
            } else {
              let northDiff = south - forwardDirections[k]
              if (northDiff < 0) {
                north += Math.abs(northDiff)
                south = 0
              } else if (northDiff === 0) {
                south = 0
              } else {
                south = northDiff
              }
            }
          } else if (k === 1) {
            if (west === 0) {
              east += forwardDirections[k]
            } else {
              let eastDiff = west - forwardDirections[k]
              if (eastDiff < 0) {
                east += Math.abs(eastDiff)
                west = 0
              } else if (eastDiff === 0) {
                west = 0
              } else {
                west = eastDiff
              }
            }
          } else if (k === 2) {
            if (north === 0) {
              south += forwardDirections[k]
            } else {
              let southDiff = north - forwardDirections[k]
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
              west += forwardDirections[k]
            } else {
              let westDiff = east - forwardDirections[k]
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
        }
        break
    }
    console.log(`north: ${north} -- east: ${east} -- south: ${south} -- west: ${west}`)
    console.log(waypoint)
  }
  return (north + east + south + west)
}

console.log(manhattanDistance(data))  // 35292 --> Correct Answer!