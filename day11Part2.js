// --- Part Two ---
// As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

// Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

// .......#.
// ...#.....
// .#.......
// .........
// ..#L....#
// ....#....
// .........
// #........
// ...#.....
// The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

// .............
// .L.L.#.#.#.#.
// .............
// The empty seat below would see no occupied seats:

// .##.##.
// #.#.#.#
// ##...##
// ...L...
// ##...##
// #.#.#.#
// .##.##.
// Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

// Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

// L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
// #.##.##.##
// #######.##
// #.#.#..#..
// ####.##.##
// #.##.##.##
// #.#####.##
// ..#.#.....
// ##########
// #.######.#
// #.#####.##
// #.LL.LL.L#
// #LLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLL#
// #.LLLLLL.L
// #.LLLLL.L#
// #.L#.##.L#
// #L#####.LL
// L.#.#..#..
// ##L#.##.##
// #.##.#L.##
// #.#####.#L
// ..#.#.....
// LLL####LL#
// #.L#####.L
// #.L####.L#
// #.L#.L#.L#
// #LLLLLL.LL
// L.L.L..#..
// ##LL.LL.L#
// L.LL.LL.L#
// #.LLLLL.LL
// ..L.L.....
// LLLLLLLLL#
// #.LLLLL#.L
// #.L#LL#.L#
// #.L#.L#.L#
// #LLLLLL.LL
// L.L.L..#..
// ##L#.#L.L#
// L.L#.#L.L#
// #.L####.LL
// ..#.#.....
// LLL###LLL#
// #.LLLLL#.L
// #.L#LL#.L#
// #.L#.L#.L#
// #LLLLLL.LL
// L.L.L..#..
// ##L#.#L.L#
// L.L#.LL.L#
// #.LLLL#.LL
// ..#.L.....
// LLL###LLL#
// #.LLLLL#.L
// #.L#LL#.L#
// Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

// Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?

var fs = require('fs')
var input = fs.readFileSync("./Day11Input.txt").toString().split("\r\n")
var test = ['L.LL.LL.LL',
            'LLLLLLL.LL',
            'L.L.L..L..',
            'LLLL.LL.LL',
            'L.LL.LL.LL',
            'L.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLLL',
            'L.LLLLLL.L',
            'L.LLLLL.LL']

const topLeft = (seatRow, seatCol, seatingChart) => {
  // console.log(`seatRow: ${seatRow} -- seatCol: ${seatCol} -- seatingChart: ${seatingChart} -- seatingChart[${seatRow}][${seatCol}]: ${seatingChart[seatRow][seatCol]}`)
  if (seatRow === 0) return '.'
  if (seatCol === 0) return '.'
  while (seatRow > 0 && seatCol > 0) {
    seatRow -= 1
    seatCol -= 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
    // console.log(`seatingChart[${seatRow}][${seatCol}]: ${seatingChart[seatRow][seatCol]}`)
  }
  return '.'
}
const topMiddle = (seatRow, seatCol, seatingChart) => {
  if (seatRow === 0) return '.'
  while (seatRow > 0) {
    seatRow -= 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}
const topRight = (seatRow, seatCol, seatingChart) => {
  // console.log(`seatRow: ${seatRow} -- seatCol: ${seatCol}`)
  if (seatRow === 0) return '.'
  if (seatCol === seatingChart[0].length-1) return '.'
  while (seatRow > 0 && seatCol < seatingChart[0].length-1) {
    seatRow -= 1
    seatCol += 1
    // console.log(`seatRow: ${seatRow} -- seatCol: ${seatCol}`)
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}
const left = (seatRow, seatCol, seatingChart) => {
  if (seatCol === 0) return '.'
  while (seatCol > 0) {
    seatCol -= 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}
const right = (seatRow, seatCol, seatingChart) => {
  if (seatCol === seatingChart[0].length-1) return '.'
  while (seatCol < seatingChart[0].length-1) {
    seatCol += 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}
const bottomLeft = (seatRow, seatCol, seatingChart) => {
  if (seatRow === seatingChart.length-1) return '.'
  if (seatCol === 0) return '.'
  while (seatRow < seatingChart.length-1 && seatCol > 0) {
    seatRow += 1
    seatCol -= 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}
const bottomMiddle = (seatRow, seatCol, seatingChart) => {
  if (seatRow === seatingChart.length-1) return '.'
  while (seatRow < seatingChart.length-1) {
    seatRow += 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}
const bottomRight = (seatRow, seatCol, seatingChart) => {
  if (seatRow === seatingChart.length-1) return '.'
  if (seatCol === seatingChart[0].length-1) return '.'
  while (seatRow < seatingChart.length-1 && seatCol < seatingChart[0].length-1) {
    seatRow += 1
    seatCol += 1
    if (seatingChart[seatRow][seatCol] === 'L') {
      return 'L'
    } else if (seatingChart[seatRow][seatCol] === '#') {
      return '#'
    }
  }
  return '.'
}

const checkAllDirections = (seatRow, seatCol, seatingChart) => {
  let allSeats = []
  allSeats.push(topLeft(seatRow, seatCol, seatingChart))
  allSeats.push(topMiddle(seatRow, seatCol, seatingChart))
  allSeats.push(topRight(seatRow, seatCol, seatingChart))
  allSeats.push(right(seatRow, seatCol, seatingChart))
  allSeats.push(bottomRight(seatRow, seatCol, seatingChart))
  allSeats.push(bottomMiddle(seatRow, seatCol, seatingChart))
  allSeats.push(bottomLeft(seatRow, seatCol, seatingChart))
  allSeats.push(left(seatRow, seatCol, seatingChart))
  return allSeats
}

const getRow = (row, seatingChart) => {
  let rowArray = []
  for (let i = 0; i < seatingChart[0].length; i++) {
    rowArray.push(checkAllDirections(row, i, seatingChart))
  }
  return rowArray
}

const buildRow = (seen, seatRow) => {
  let seatingRow = ''
  for (let i = 0; i < seatRow.length; i++) {
    if (seatRow[i] === '.') {
      seatingRow += '.'
    } else if (seatRow[i] === 'L') {
      for (let j = 0; j < seen[i].length; j++) {
        if (seen[i][j] === '#') {
          seatingRow += 'L'
          break
        }
      }
      if (!seatingRow[i]) {
        seatingRow += '#'
      }
    } else {
      let count = 0
      for (let j = 0; j < seen[i].length; j++) {
        if (seen[i][j] === '#') {
          count += 1
          if (count === 5) {
            seatingRow += 'L'
            break
          }
        }
      }
      if (!seatingRow[i]) {
        seatingRow += '#'
      }
    }
  }
  return seatingRow
}

const occupySeats = (seatingChart) => {
  let seats = []
  let row = []
  for (let i = 0; i < seatingChart.length; i++) {
    row = getRow(i, seatingChart)
    seats.push(buildRow(row, seatingChart[i]))
    // console.log(seats)
  }
  return seats
}

const arraysEqual = (array1, array2) => {
  if (array1 === array2) return true
  if (array1 === null || array2 === null) return false
  if (array1.length !== array2.length) return false
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

const countOccupiedSeats = (seatingChart) => {
  let previous = []
  let count = 0
  while (arraysEqual(seatingChart, previous) === false) {
    count += 1
    previous = seatingChart
    seatingChart = occupySeats(seatingChart)
  }
  console.log(count)
  // console.log(seatingChart)
  // console.log(previous)
  let occupied = 0
  for (let i = 0; i < seatingChart.length; i++) {
    for (let j = 0; j < seatingChart[i].length; j++) {
      if (seatingChart[i][j] === '#') {
        occupied += 1
      }
    }
  }
  return occupied
}

console.log(countOccupiedSeats(input))  // 1865 --> Correct Answer!