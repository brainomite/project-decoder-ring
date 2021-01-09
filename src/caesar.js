const genCharArray = require("./gen-char-array");

const ALPHABET_ARR = genCharArray("a", "z"); // ["a", "b", ... "y", "z"]

function caesar(inputStr, shiftInt, encodeBool = true) {
  // if shift is missing or 0, not in between 25 and -25, return false
  if (!shiftInt || shiftInt > 25 || shiftInt < -25) return false;
  // translate each character and return the new string
  // decoding is the reverse of encoding!
  const resultStr = encodeBool
    ? translate(inputStr, shiftInt)
    : translate(inputStr, shiftInt * -1);
  return resultStr;
}

module.exports = caesar;

function translate(inputStr, actualShiftInt) {
  const resultStr = inputStr
    // treat all characters as lowercase
    .toLowerCase()
    .split("")
    .map(translateLetterToEncodedLetterUsingShiftOf(actualShiftInt))
    .join("");
  return resultStr;
}

function translateLetterToEncodedLetterUsingShiftOf(actualShiftInt) {
  // using a higher order function to return a function with access to
  // actualShiftInt
  return function translateLetterToEncodedLetter(charStr) {
    // find the position of the letter
    const origIndexInt = ALPHABET_ARR.indexOf(charStr);
    // if its not alphabetic, return the original letter, intact
    if (notAlphabetic(origIndexInt)) return charStr;
    // math trick, use the remainder to auto-wrap around the array
    const newIndexInt = (origIndexInt + actualShiftInt) % 26;
    const resultStr =
      newIndexInt >= 0
        ? // approach from the left as index is not negative
          ALPHABET_ARR[newIndexInt]
        : // newIndexInt is negative here, so we approach from the right
          ALPHABET_ARR[26 + newIndexInt];
    return resultStr;
  };
}

function notAlphabetic(origIndex) {
  return origIndex === -1;
}
