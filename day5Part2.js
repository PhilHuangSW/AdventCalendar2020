// --- Part Two ---
// Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

// It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

// Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

// What is the ID of your seat?

var fs = require('fs')
var input = fs.readFileSync("./day5Input.txt").toString().split("\n")

const calculateSeatRow = (boardingRow) => {
  let startRow = 0
  let endRow = 127
  for (let i = 0; i < boardingRow.length; i++) {
    var diff = endRow - startRow
    if (boardingRow[i] === 'F') {
      endRow -= Math.ceil(diff/2)
    } else {
      startRow += Math.ceil(diff/2)
    }
    // console.log(`${startRow} -- ${endRow} -- ${diff}`)
  }
  // console.log(`${startRow} -- ${endRow} -- ${diff}`)
  return startRow
}

const calculateSeatCol = (boardingCol) => {
  let startCol = 0
  let endCol = 7
  for (let i = 0; i < boardingCol.length; i++) {
    var diff = endCol - startCol
    if (boardingCol[i] === 'L') {
      endCol -= Math.ceil(diff/2)
    } else {
      startCol += Math.ceil(diff/2)
    }
    // console.log(`${startCol} -- ${endCol} -- ${diff}`)
  }
  return startCol
}

const calculateSeatID = (row, col) => {
  return row * 8 + col
}

var seats = []
const calculateHighestSeatID = (binaryBoarding) => {
  for (let i = 0; i < binaryBoarding.length; i++) {
    let row = calculateSeatRow(binaryBoarding[i].slice(0,7))
    let col = calculateSeatCol(binaryBoarding[i].slice(7,10))
    let seatID = calculateSeatID(row, col)
    seats.push(seatID)
    // console.log(`row: ${row} -- col: ${col} -- highest: ${highest} -- seatID: ${seatID}`)
  }
}

calculateHighestSeatID(input)
seats.sort((a,b) => a - b)

var j = seats[0]
for (let i = 1; i < seats.length; i++) {
  j += 1
  if (seats[i] != j) {
    console.log(j)  // 534 --> Correct Answer!
    break;
  }
}

