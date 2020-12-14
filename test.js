function crt(num, rem) {
  let sum = 0;
  const prod = num.reduce((a, c) => a * c, 1);
 
  for (let i = 0; i < num.length; i++) {
    const [ni, ri] = [num[i], rem[i]];
    const p = Math.floor(prod / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return sum % prod;
}
 
function mulInv(a, b) {
  const b0 = b;
  let [x0, x1] = [0, 1];
 
  if (b === 1) {
    return 1;
  }
  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}
 
// import modInverse from './modInverse.js'
// console.log(crt([17,13,19], [0,2,3]))

const { parseInputFile } = require('../utils/parser');

/*
 * Performs a negative-aware modulus operation.
 * @param {number} a 
 * @param {number} n 
 * @returns {number}
 */
function absmod(a, n) {
    while (a < 0) {
        a += n;
    }
    return a % n;
}

// parse inputs
const inputs = parseInputFile('day13-input.txt', /(?:^|,)([\dx]+)(?=,|$)/gm)
    // skip the first line of the input
    .slice(1)
    // parse into object
    .map(([, id], i) => ({ id: parseInt(id.trim()), i }))
    // skip 'unconstrained' busses
    .filter(bus => !Number.isNaN(bus.id))
    // sort in descending order by id
    .sort((b1, b2) => b2.id - b1.id)
    // convert to bigints
    .map(bus => ({ id: BigInt(bus.id), offset: BigInt(absmod(bus.id - bus.i, bus.id)) }));

let cN = inputs[0].id;
let cA = inputs[0].offset;
for (let i = 1; i < inputs.length; i++) {
    const bus = inputs[i];
    while (cA % bus.id !== bus.offset) {
        cA += cN;
    }
    cN *= bus.id;
}

// Expected: 556100168221141
console.log(`Part 2: the timestamp is ${ cA }`);