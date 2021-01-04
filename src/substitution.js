const genCharArray = require("./gen-char-array");

const NUMBER_OF_LETTERS_IN_ENGLISH = 26;
const ALPHABET_ARR = genCharArray("a", "z"); // ["a", "b", ... "y", "z"]

function substitution(inputStr, substitutionAlphabetStr, encodeBool = true) {
  // return false  substitution is undefined or if length not 26 or there are
  // non unique characters
  if (
    !substitutionAlphabetStr ||
    substitutionAlphabetStr.length !== NUMBER_OF_LETTERS_IN_ENGLISH ||
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
  // if they were all unique, we should have 26 keys
  return Object.keys(charCounterObj).length !== NUMBER_OF_LETTERS_IN_ENGLISH
}

module.exports = substitution;
