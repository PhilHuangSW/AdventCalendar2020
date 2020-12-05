// --- Part Two ---
// The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

// You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.
// Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

// byr valid:   2002
// byr invalid: 2003

// hgt valid:   60in
// hgt valid:   190cm
// hgt invalid: 190in
// hgt invalid: 190

// hcl valid:   #123abc
// hcl invalid: #123abz
// hcl invalid: 123abc

// ecl valid:   brn
// ecl invalid: wat

// pid valid:   000000001
// pid invalid: 0123456789
// Here are some invalid passports:

// eyr:1972 cid:100
// hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

// iyr:2019
// hcl:#602927 eyr:1967 hgt:170cm
// ecl:grn pid:012533040 byr:1946

// hcl:dab227 iyr:2012
// ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

// hgt:59cm ecl:zzz
// eyr:2038 hcl:74454a iyr:2023
// pid:3556412378 byr:2007
// Here are some valid passports:

// pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
// hcl:#623a2f

// eyr:2029 ecl:blu cid:129 byr:1989
// iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

// hcl:#888785
// hgt:164cm byr:2001 iyr:2015 cid:88
// pid:545766238 ecl:hzl
// eyr:2022

// iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
// Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?

var fs = require('fs');
var input = fs.readFileSync("./day4Input.txt").toString().split("\r\n\r\n");

var passportWithoutCid = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
passportWithoutCid.sort();
var count = 0;

const checkBirthYear = (byr) => {
  const regex = /\d{4}/
  if (regex.test(byr) === false) {
    return false;
  }
  if (byr < 1920 || byr > 2002) {
    return false;
  }
  return true;
}

const checkIssueYear = (iyr) => {
  const regex = /\d{4}/
  if (regex.test(iyr) === false) {
    return false;
  }
  if (iyr < 2010 || iyr > 2020) {
    return false;
  }
  return true;
}

const checkExpirationYear = (eyr) => {
  const regex = /\d{4}/
  if (regex.test(eyr) === false) {
    return false;
  }
  if (eyr < 2020 || eyr > 2030) {
    return false;
  }
  return true;
}

const checkHeight = (hgt) => {
  const heightNumRegex = /\d+/;
  let heightNum = hgt.match(heightNumRegex)[0];
  // console.log(`height: ${heightNum}`);
  const measurementRegex = /[a-zA-Z]+/;
  if (hgt.match(measurementRegex) != null) {
    var measurement = hgt.match(measurementRegex)[0];
  } else {
    return false;
  }
  // console.log(`measurement: ${measurement}`);
  if (measurement !== 'cm' && measurement !== 'in') {
    return false;
  } else if (measurement === 'cm') {
    if (heightNum < 150 || heightNum > 193) {
      return false;
    }
  } else {
    if (heightNum < 59 || heightNum > 76) {
      return false;
    }
  }
  return true;
}

const checkHairColor = (hcl) => {
  const hairColorRegex = /#[a-f0-9]{6}\b/;
  return hairColorRegex.test(hcl);
}

const eyeColorSet = new Set(['amb','blu','brn','gry','grn','hzl','oth']);
const checkEyeColor = (ecl) => {
  if (!eyeColorSet.has(ecl)) {
    return false;
  }
  return true;
}

const checkPassportID = (pid) => {
  const passportRegex = /\b\d{9}\b/;
  return passportRegex.test(pid);
}

const validPassport = (passport) => {
  for (let i = 0; i < passport.length; i++) {
    let passportData = passport[i].split(/[' ','\n','\r\n']/);
    let checkData = [];
    // console.log(passportData);
    for (let j = 0; j < passportData.length; j++) {
      if (passportData[j] != '') {
        if (passportData[j].slice(0,3) === 'cid') {
          continue;
        }
        checkData.push(passportData[j].slice(0,3));
        var idx = 4;
        while (passportData[j][idx] != ' ' && passportData[j][idx] != undefined) {
          idx += 1;
        }
        let data = passportData[j].slice(4, idx);
        var valid = true;
        console.log(`check:${checkData[checkData.length-1]} -- data: ${data}`);
        switch (checkData[checkData.length-1]) {
          case 'byr':
            if (checkBirthYear(data) === false) {
              valid = false;
            }
            break;
          case 'iyr':
            if (checkIssueYear(data) === false) {
              valid = false;              
            }
            break;
          case 'eyr':
            if (checkExpirationYear(data) === false) {
              valid = false;
            }
            break;
          case 'hgt':
            if (checkHeight(data) === false) {
              valid = false;
            }
            break;
          case 'hcl':
            if (checkHairColor(data) === false) {
              valid = false;
            }
            break;
          case 'ecl':
            if (checkEyeColor(data) === false) {
              valid = false;
            }
            break;
          case 'pid':
            if (checkPassportID(data) === false) {
              valid = false;
            }
            break;
          default:
            break;
        }
        if (valid === false) {
          break;
        }
      }
    }
    console.log('----------------------------------------')

    if (valid === false) {
      continue;
    }
    // we sort because the check has to match exactly the order of our checker array
    // ['byr','iyr','eyr','hgt','hcl','ecl','pid'] <- specifically in this order without CID
    checkData = checkData.sort();
    if (checkArrayEqual(checkData, passportWithoutCid)) {
      count += 1;
    }
    console.log(count)
  }
}

// checks if 2 arrays are equal to each other, returns true if equal, false otherwise
const checkArrayEqual = (array1, array2) => {
  if (array1.length != array2.length) {
    return false;
  } else {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] != array2[i]) {
        return false;
      }
    }
  }
  return true;
}

validPassport(input)
// console.log(count)

//// BirthYear Tests
// console.log(checkBirthYear(1920))
// console.log(checkBirthYear(2002))
// console.log(checkBirthYear(13593))
// console.log(checkBirthYear(19))
// console.log(checkBirthYear('str35'))
// console.log(checkBirthYear('2003'))
// console.log(checkBirthYear(1))
// console.log(checkBirthYear(1920583958))

//// IssueYear Tests
// console.log(checkIssueYear(2020))
// console.log(checkIssueYear(2015))
// console.log(checkIssueYear(13593))
// console.log(checkIssueYear(19))
// console.log(checkIssueYear('str35'))
// console.log(checkIssueYear('2013'))
// console.log(checkIssueYear(1))
// console.log(checkIssueYear(1920583958))

//// ExpirationYear Tests
// console.log(checkExpirationYear(2020))
// console.log(checkExpirationYear(2025))
// console.log(checkExpirationYear(13593))
// console.log(checkExpirationYear(19))
// console.log(checkExpirationYear('str35'))
// console.log(checkExpirationYear('2031'))
// console.log(checkExpirationYear(1))
// console.log(checkExpirationYear(1920583958))

//// Height Tests
// console.log(checkHeight('192cm'))
// console.log(checkHeight('60in'))
// console.log(checkHeight('20201cm'))
// console.log(checkHeight('20201cmjasd'))

//// HairColor Tests
// console.log(checkHairColor('#003003'))
// console.log(checkHairColor('#ffffff'))
// console.log(checkHairColor('#123abf'))
// console.log(checkHairColor('#jk3j03asd'))
// console.log(checkHairColor('#jk3j03345'))
// console.log(checkHairColor('jk3j035'))
// console.log(checkHairColor('#jk3j0z'))
// console.log(checkHairColor('#jkz3j05'))

//// EyeColor Tests
// console.log(checkEyeColor('blue'))
// console.log(checkEyeColor('bla'))
// console.log(checkEyeColor('br'))
// console.log(checkEyeColor('grn'))
// console.log(checkEyeColor('blokaenj'))
// console.log(checkEyeColor('amb'))

////PassportID Tests
// console.log(checkPassportID('56048965'))
// console.log(checkPassportID('56048965645'))
// console.log(checkPassportID('560489gfdas65'))
// console.log(checkPassportID('43ajlkjg'))
// console.log(checkPassportID('5604398978'))
// console.log(checkPassportID('560439897j'))
// console.log(checkPassportID('560439897'))