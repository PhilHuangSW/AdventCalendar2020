// The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

// Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

// In your expense report, what is the product of the three entries that sum to 2020?

var fs = require('fs');
var input = fs.readFileSync("./day_1_input.txt").toString().split('\n');
var nums = []
for(i in input) {
  let val = parseInt(input[i])
  nums.push(val);
}
console.log(nums);

const 