// const fs = require("fs");
// const path = require('path');

// const getSetOfNumbers = (n, k) => {
//     let newSet = new Set();
//     for (let i = n; i <= k; i++) {
//         newSet.add(i);
//     };
//     return newSet;
// }


// // PART 1
// const isValueValid = (v, ticketsRules) => {
//     let isValid = false;
//     ticketsRules.forEach((set) => {
//         if (set.has(v)) {
//             isValid = true;
//             return;
//         }
//     });
//     return isValid;
// }

// const getInvalidValues = (ticket, ticketsRules) => {
//     return ticket.reduce((acc, v) => {
//         if (!isValueValid(v, ticketsRules)) return [...acc, v];
//         return acc;
//     }, [])
// };

// const getScanningErrorRate = (tickets, ticketsRules) => {
//     let invalidValues = [];
//     let invalidTicketKeys = [];

//     tickets.forEach((ticket, k) => {
//         const invalid = getInvalidValues(ticket, ticketsRules);
//         if (invalid.length) invalidTicketKeys = [...invalidTicketKeys, k]
//         invalidValues = [...invalidValues, ...invalid]
//     });
    
//     return {
//         invalidTicketKeys,
//         scanningErrorRate: invalidValues.length ? invalidValues.reduce((acc, cur) => acc + cur) : 0
//     };
// };

var fs = require('fs')
var input = fs.readFileSync("./asd.txt").toString().split("\r\n")

var data = []
for (let i = 0; i < input.length; i++) {
    let la = input[i].split(",")
    for (let j = 0; j < la.length; j++) {
        data.push(la[j])
    }
}
console.log(data.length)