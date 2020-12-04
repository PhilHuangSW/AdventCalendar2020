// --- Part Two ---
// Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

// Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
// In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

// What do you get if you multiply together the number of trees encountered on each of the listed slopes?

var fs = require('fs');
var input = fs.readFileSync("./day3Input.txt").toString().split("\n");

// Finds the trees encountered given the right slope and down slope
const treeEncountersCount = (path, slope, downSlope) => {
  let count = 0;
  let rightMove = 0;
  let idx = 0;
  while (idx < path.length) {
    rightMove %= (path[idx].length-1);
    if (path[idx][rightMove] === '#') {
      count += 1
    }
    rightMove += slope;
    idx += downSlope;
  }
  return count;
}

// Finds all trajectory paths' trees and multiplies them all together
const findTotalTreesEncountered = (trajectory, path) => {
  let count = 1;
  for (let i = 0; i < trajectory.length; i++) {
    count *= treeEncountersCount(path, trajectory[i][0], trajectory[i][1]);
    // console.log(count);
  }
  return count;
}

var totalTrees = 0;
var trajectory = [[1,1],[3,1],[5,1],[7,1],[1,2]]; // [right,down] i.e. trajectory[2] => [5,1] => right 5, down 1

totalTrees = findTotalTreesEncountered(trajectory, input);
console.log(totalTrees); // 7560370818 --> Correct Answer!


