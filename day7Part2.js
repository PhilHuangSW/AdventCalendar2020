// --- Part Two ---
// It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

// Consider again your shiny gold bag and the rules from the above example:

// faded blue bags contain 0 other bags.
// dotted black bags contain 0 other bags.
// vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
// dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
// So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

// Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

// Here's another example:

// shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.
// In this example, a single shiny gold bag must contain 126 other bags.

// How many individual bags are required inside your single shiny gold bag?

var fs = require('fs')
var input = fs.readFileSync("./day7Input.txt").toString().split("\r\n")
// console.log(input[0])

var data = []

const arrayifyInput = (array) => {
  
}


class TreeNode {
  constructor(value) {
    this.value = value
    this.child = []
  }
}

// var shinyGold = new TreeNode(['shiny gold', 1])

const findShinyGoldBag = (bags) => {
  for (let i = 0; i < bags.length; i++) {
    let bagIndex = bags[i].indexOf('bags') - 1
    if (bags[i].slice(0, bagIndex) === 'shiny gold') {
      // let numRegex = /\d+/g
      // let arr = [...bag[i].matchAll(numRegex)]
      // var idx = 26
      // for (let i = 0; i < arr.length; i++) {
      //   let temp = parseInt(arr[i][0])
      //   let tree = new TreeNode([bags[i].slice(26,37), temp]
      // }
      return bags[i]
    }
  }
}

// var shinyGold = findShinyGoldBag(input)

const parseBags = (parent, quantity, bags, color) => {
  let bagContains = ''
  for (let i = 0; i < bags.length; i++) {
    if (bags[i].match(color)) {
      bagContains = bags[i]
      break;
    }
  }
  let containsNone = /contain no other bag/
  if (containsNone.test(bagContains)) {
    return 0
  }
  let nums = []
  let bag = []
  let numRegex = /\d+/g
  let bagRegex = /bag/g
  let arr = [...bagContains.matchAll(numRegex)]
  let bar = [...bagContains.matchAll(bagRegex)]
  for (let i = 0; i < arr.length; i++) {
    let temp = parseInt(arr[i][0]) * quantity
    nums.push(temp)
  }
  for (let i = 1; i < bar.length; i++) {
    let temp1 = bagContains.slice(arr[i-1].index+2, bar[i].index-1)
    bag.push(temp1)
  }
  // console.log(arr[1])
  // console.log(bar)
  // console.log(nums)
  // console.log(bag)
  let bagObject = []
  for (let i = 0; i < nums.length; i++) {
    bagObject.push([nums[i], bag[i]])
  }
  // console.log(bagObject)
  for (let i = 0; i < bagObject.length; i++) {
    let tree = new TreeNode(bagObject)
    parent.child = tree
  }
  // console.log(parent)
}

// console.log(parseBags(input[0], 2))
// console.log(parseBags(input[72], 2))

test = ["shiny gold bags contain 2 dark red bags, 3 red bags.",
"dark red bags contain 2 dark orange bags.",
"dark orange bags contain 2 dark yellow bags.",
"dark yellow bags contain 2 dark green bags.",
"dark green bags contain 2 dark blue bags.",
"dark blue bags contain 2 dark violet bags.",
"dark violet bags contain no other bags."]



const findColorBag = (bags, color) => {
  for (let i = 0; i < bags.length; i++) {
    let bagIndex = bags[i].indexOf('bags') - 1
    if (bags[i].slice(0, bagIndex) === color) {
      // console.log(bags[i])
      return bags[i]
    }
  }
}

var nums = []
const getNums = (bag, quantity) => {
  var numRegex = /\d+/g
  var arr = [...bag.matchAll(numRegex)]
  for (let i = 0; i < arr.length; i++) {
    let temp = parseInt(arr[i][0]) * quantity
    nums.push(temp)
  }
  // console.log(bag.slice(containIndex, numIndex))
}





















// var gold = findShinyGoldBag(input)
// console.log(gold)
// // console.log(getNums(gold, 1))
// var paleIndigo = findColorBag(input, 'pale indigo')
// console.log(paleIndigo)
// getNums(paleIndigo, 1)
// // console.log(nums)
// var paleYellow = findColorBag(input, 'pale yellow')
// console.log(paleYellow)
// getNums(paleYellow, 3)
// // console.log(nums)
// var drabBlue = findColorBag(input, 'drab blue')
// console.log(drabBlue)
// getNums(drabBlue, 5)
// // console.log(nums)
// var poshFuchsia = findColorBag(input, 'posh fuchsia')
// console.log(poshFuchsia)
// getNums(poshFuchsia, 3)
// // console.log(nums)
// var dullSilver = findColorBag(input, 'dull silver')
// console.log(dullSilver)
// // console.log(nums)
// var shinyGreen = findColorBag(input, 'shiny green')
// console.log(shinyGreen)
// getNums(shinyGreen, 1)
// var mutedSilver = findColorBag(input, 'muted silver')
// console.log(mutedSilver)
// getNums(mutedSilver, 5)
// // console.log(nums)
// var darkGray = findColorBag(input, 'dark gray')
// console.log(darkGray)
// getNums(darkGray, 2)
// // console.log(nums)
// var dottedLime = findColorBag(input, 'dotted lime')
// console.log(dottedLime)
// getNums(dottedLime, 4)
// // console.log(nums)
// var shinyGreen = findColorBag(input, 'shiny green')
// console.log(shinyGreen)
// getNums(shinyGreen, 3)
// // console.log(nums)
// var wavyOlive = findColorBag(input, 'wavy olive')
// console.log(wavyOlive)
// getNums(wavyOlive, 3)
// // console.log(nums)
// var darkAqua = findColorBag(input, 'dark aqua')
// console.log(darkAqua)
// getNums(darkAqua, 5)
// // console.log(nums)
// var mutedWhite = findColorBag(input, 'muted white')
// console.log(mutedWhite)
// getNums(mutedWhite, 4)
// getNums(mutedWhite, 1)
// getNums(shinyGreen, 2)
// var dullBlack = findColorBag(input, 'dull black')
// console.log(dullBlack)
// getNums(dullBlack, 5)
// getNums(mutedSilver, 5)
// var brightWhite = findColorBag(input, 'bright white')
// console.log(brightWhite)
// getNums(brightWhite, 2)
// var poshRed = findColorBag(input, 'posh red')
// console.log(poshRed)
// getNums(poshRed, 2)
// // console.log(nums)
// var lightSilver = findColorBag(input, 'light silver')
// console.log(lightSilver)
// getNums(lightSilver, 5)
// getNums(shinyGreen, 1)
// var mirroredAqua = findColorBag(input, 'mirrored aqua')
// console.log(mirroredAqua)
// getNums(mirroredAqua, 1)
// var mirroredYellow = findColorBag(input, 'mirrored yellow')
// console.log(mirroredYellow)
// getNums(mirroredYellow, 1)
// getNums(darkAqua, 4)
// var mutedFuchsia = findColorBag(input, 'muted fuchsia')
// console.log(mutedFuchsia)
// getNums(mutedFuchsia, 2)
// getNums(mirroredAqua, 5)
// var wavyBeige = findColorBag(input, 'wavy beige')
// console.log(wavyBeige)
// getNums(wavyBeige, 5)
// getNums(paleYellow, 3)
// getNums(brightWhite, 2)
// var mutedViolet = findColorBag(input, 'muted violet')
// console.log(mutedViolet)
// getNums(mutedViolet, 2)
// getNums(darkGray, 1)
// getNums(mirroredYellow, 1)
// getNums(darkAqua, 4)
// var brightBlue = findColorBag(input, 'bright blue')
// console.log(brightBlue)
// getNums(brightBlue, 1)
// getNums(mutedViolet, 2)
// getNums(brightWhite, 1)
// var vibrantRed = findColorBag(input, 'vibrant red')
// console.log(vibrantRed)
// getNums(vibrantRed, 5)
// var fadedLavender = findColorBag(input, 'faded lavender')
// console.log(fadedLavender)
// getNums(fadedLavender, 1)
// // console.log(nums.length)
// // console.log(nums)
// getNums(mirroredYellow, 5)
// getNums(lightSilver, 5)
// getNums(mutedFuchsia, 2)
// getNums(brightBlue, 5)
// console.log(nums.length)


// const sum = (nums) => {
//   var ans = nums.reduce(function(a,b){
//     return a + b
//   }, 0)
//   return ans
// }

// console.log(sum(nums))




// getNums(gold, 1)
// console.log(nums)
// getNums(gold)
// var numRegex = /\d+/g
// var arr = [...gold.matchAll(numRegex)]
// console.log(arr[0][0])
// console.log(arr[1][0])

// const allColors = (bags) => {
  
// }


// allColors(input)




// var paleIndigo = findColorBag(input, 'pale indigo')
// var paleYellow = findColorBag(input, 'pale yellow')

// var ob = {'shiny': 2}
// ob.shiny += 1
// console.log(ob.shiny)


// first find the shiny gold bag and find what it contains
// take the color(s) of the bags that it contains and make a count of how many there are




// const shinyGold = new TreeNode(1)
// const paleIndigo = new TreeNode(3)
// const paleYellow = new TreeNode(5)
// shinyGold.child.push(paleIndigo, paleYellow)

// var sum = 0
// const dfs = (tree) => {
//   if (tree.child) {
//     tree.child.forEach(child => dfs(child))
//   }
//   sum += tree.value
// }

// dfs(shinyGold)
// console.log(sum)










