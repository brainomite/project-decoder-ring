const genCharArray = require("./gen-char-array");

const ALPHABET_ARR = genCharArray("a", "z"); // ["a", "b", ... "y", "z"]

function substitution(inputStr, substitutionAlphabetStr, encodeBool = true) {
  // return false if length not 26 or there are non unique characters
  if (
    substitutionAlphabetStr.length !== 26 ||
    notAllUniqueChars(substitutionAlphabetStr)
  ) {
    return false;
  }

  // encoding is just translating from one to the other and decoding is the
  // the opposite, so we can by DRY and reuse a function reversing the inputs
  if (encodeBool) {
    return translate(inputStr, ALPHABET_ARR, substitutionAlphabetStr.split(""));
  } else {
    return translate(inputStr, substitutionAlphabetStr.split(""), ALPHABET_ARR);
  }
}

function translate(inputStr, fromAlphabetArr, toAlphabetArr) {
  return inputStr
    .toLowerCase()
    .split("")
    .map((charStr) => {
      // if its a space, leave it be by returning a space
      if (charStr === " ") {
        return " ";
      }
      // find the index of the char in the from alphabet
      const charPosInt = fromAlphabetArr.indexOf(charStr);
      // return the translated character using the to alphabet
      return toAlphabetArr[charPosInt];
    })
    .join("");
}

function notAllUniqueChars(string) {
  // create a counter object for char counts
  let charCounterObj = string.split("").reduce((counterObj, charStr) => {
    counterObj[charStr] = counterObj[charStr] ? counterObj[charStr] + 1 : 1;
    return counterObj;
  }, {});
  // if any of the char counts is not 1 then return true
  return Object.keys(charCounterObj).some((charStr) => {
    return charCounterObj[charStr] !== 1;
  });
}

module.exports = substitution;
