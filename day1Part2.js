// The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

// Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

// In your expense report, what is the product of the three entries that sum to 2020?

var fs = require('fs');
var input = fs.readFileSync("./day1Input.txt").toString().split('\n');
var nums = []
for(i in input) {
  let val = parseInt(input[i])
  nums.push(val);
}
// console.log(nums);

nums = nums.sort((a,b) => a - b);
// nums = nums.sort((a,b) => b - a);
// console.log(nums);

// fs.writeFile('output.txt', nums.toString(), (err) => {
//   if (err) throw err;
// })
// var file = fs.createWriteStream('output.txt');
// file.on('error', function(err) { if (err) throw err });
// nums.forEach(function(v) {file.write(v + '\n');});
// file.end();

const find3SumTo2020ThenMultiplyTogether = (array) => {
  var arr = []
  for (let i = 0; i < array.length; i++) {
    var left = i + 1;
    var right = array.length - 1;
    while (left < right) {
      // console.log(`${array[i]} -- ${array[left]} -- ${array[right]}`)
      var total = array[i] + array[left] + array[right];
      // console.log(total);
      if (total == 2020) {
        arr.push(array[i]);
        arr.push(array[left]);
        arr.push(array[right]);
        break;
      } else if (total < 2020) {
        left += 1;
      } else {
        right -= 1;
      }
    }
  }
  return arr[0] * arr[1] * arr[2]
}

var ans = find3SumTo2020ThenMultiplyTogether(nums);
console.log(ans);