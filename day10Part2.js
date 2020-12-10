// --- Part Two ---
// To completely determine whether you have enough adapters, you'll need to figure out how many different ways they can be arranged. Every arrangement needs to connect the charging outlet to your device. The previous rules about when adapters can successfully connect still apply.

// The first example above (the one that starts with 16, 10, 15) supports the following arrangements:

// (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 5, 6, 7, 10, 12, 15, 16, 19, (22)
// (0), 1, 4, 5, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 5, 7, 10, 12, 15, 16, 19, (22)
// (0), 1, 4, 6, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 6, 7, 10, 12, 15, 16, 19, (22)
// (0), 1, 4, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 7, 10, 12, 15, 16, 19, (22)
// (The charging outlet and your device's built-in adapter are shown in parentheses.) Given the adapters from the first example, the total number of arrangements that connect the charging outlet to your device is 8.

// The second example above (the one that starts with 28, 33, 18) has many arrangements. Here are a few:

// (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
// 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 48, 49, (52)

// (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
// 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 49, (52)

// (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
// 32, 33, 34, 35, 38, 39, 42, 45, 46, 48, 49, (52)

// (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
// 32, 33, 34, 35, 38, 39, 42, 45, 46, 49, (52)

// (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
// 32, 33, 34, 35, 38, 39, 42, 45, 47, 48, 49, (52)

// (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
// 46, 48, 49, (52)

// (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
// 46, 49, (52)

// (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
// 47, 48, 49, (52)

// (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
// 47, 49, (52)

// (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
// 48, 49, (52)
// In total, this set of adapters can connect the charging outlet to your device in 19208 distinct arrangements.

// You glance back down at your bag and try to remember why you brought so many adapters; there must be more than a trillion valid ways to arrange them! Surely, there must be an efficient way to count the arrangements.

// What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?

var test1 = [16,10,15,5,1,11,7,19,6,12,4]

var test2 = [28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3]

var fs = require('fs')
var input = fs.readFileSync("./day10Input.txt").toString().split("\r\n")

// Converts the input into an array that is reverse-sorted as well as has the starting value of 0 (charging outlet) and your device's built in adapter which has a value of +3 higher than the highest value in the input array
const getData = (array) => {
  let data = []
  data.push(0)
  data.push(Math.max(...array) + 3)
  for (let i = 0; i < array.length; i++) {
    data.push(parseInt(array[i]))
  }
  data.sort(function(a,b){
    return b - a
  })
  console.log(data)
  return data
}

var inputData = getData(input)

const countPaths = (data) => {
  let dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 1
  for (let i = 3; i < data.length; i++) {
    let calcPaths = 0
    for (let j = 1; j <= 3; j++) {
      // console.log(`data[i]: ${data[i]} - data[i-j]: ${data[i-j]}`)
      if (data[i-j] - data[i] <= 3) {
        calcPaths += 1
      } else {
        // console.log('too much!')
        // console.log(calcPaths)
        break
      }
    }
    if (calcPaths === 3) {
      // console.log(calcPaths)
      dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
      // console.log(`dp[i]: ${dp[i]} -- dp[i-1]: ${dp[i-1]} -- dp[i-2]: ${dp[i-2]} -- dp[i-3]: ${dp[i-3]}`)
    } else if (calcPaths === 2) {
      dp[i] = dp[i-1] + dp[i-2]
      // console.log(`dp[i]: ${dp[i]} -- dp[i-1]: ${dp[i-1]} -- dp[i-2]: ${dp[i-2]}`)
    } else {
      dp[i] = dp[i-1]
      // console.log(`dp[i]: ${dp[i]} -- dp[i-1]: ${dp[i-1]}`)
    }
  }
  console.log(data)
  console.log(dp)
  console.log(dp[dp.length-1])
}

countPaths(inputData)