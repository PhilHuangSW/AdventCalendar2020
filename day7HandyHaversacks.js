// --- Day 7: Handy Haversacks ---
// You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

// Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

// For example, consider the following rules:

// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.
// These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

// You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

// In the above rules, the following options would be available to you:

// A bright white bag, which can hold your shiny gold bag directly.
// A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
// A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
// A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
// So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

// How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)

var fs = require('fs')
var input = fs.readFileSync("./day7Input.txt").toString().split('\r\n')
// console.log(input[0])

// var test = ["light red bags contain 1 bright white bag, 2 muted yellow bags.",
//             "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
//             "bright white bags contain 1 shiny gold bag.",
//             "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
//             "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
//             "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
//             "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
//             "faded blue bags contain no other bags."]

var containsColorSet = new Set()
// this finds all the colored bags that it can contain and adds it to the set
// i.e. bags === input or test
// color === 'shiny gold'
// calculateBags(input, 'shiny gold') returns nothing, but each colored bag that can contain 'shiny gold' bags will get added to the set
// containsColorSet = { 'dull fuchsia',
//                      'clear indigo',
//                      'mirrored lavender',
//                      'wavy yellow',
//                      'muted aqua',
//                      'light tomato',
//                      'striped maroon',
//                      'dotted beige',
//                      'dim chartreuse'
// }
const calculateBags = (bags, color) => {
  for (let i = 0; i < bags.length; i++) {
    if (bags[i].match(color)) {
      if (bags[i].slice(0, color.length) !== color) {
        let idx = bags[i].indexOf('bags')
        let bagColor = bags[i].slice(0, idx-1)
        containsColorSet.add(bagColor)
      }
    }
  }
  console.log(containsColorSet)
}
calculateBags(input, 'shiny gold')
calculateBags(input, 'dull fuchsia')

// This calculates EACH element in the Set and continually adds colors that can contain that color bag
// i.e. 'dull fuchsia' will add to the set { 'posh silver', 'mirrored white', 'vibrant tan', 'bright chartreuse' }
// This continues until it has found ALL bags that can contain 'shiny gold' bags --> ALL elements in the Set containsColorSet
const calculateContains = (bags) => {
  bags.forEach(color => calculateBags(input, color))
  console.log(bags)
  return bags.size
}

console.log(calculateContains(containsColorSet))



// find all occurrences of 'shiny gold' store into a Sett
// take that Set, get all 'colors' that don't start with 'shiny gold' and put those colors into Set
// iterate through the Set and find other bags that can contain those colors
// log the size of the Set once all elements have been iterated through