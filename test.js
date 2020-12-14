const { argv } = require("process")

var ob = {}
ob['251'] = 231
// console.log(ob)
ob['251'] = 101
// console.log(ob['251'])
ob['255'] = 23
ob['2'] = 11

console.log(ob)

var sum = 0
// ob.forEach(function(element) {
//   sum += ob[element]
// })

// console.log(sum)

Object.entries(ob).forEach(([key, value]) => sum += value)
console.log(sum)