const genCharArray = require("./gen-char-array");

const ALPHABET_ARR = genCharArray("a", "z"); // ["a", "b", ... "y", "z"]

function caesar(input, shift, encode = true) {
  // if shift is missing or 0, not in between 25 and -25, return false
  if (!shift || shift > 25 || shift < -25) return false;
  // decoding is the reverse of encoding!
  const actualShift = encode ? shift : shift * -1;

  // translate each character and return the new string
  return (
    input
      // treat all characters as lowercase
      .toLowerCase()
      .split("")
      .map((letter) => {
        // find the position of the letter
        const origIndex = ALPHABET_ARR.indexOf(letter);
        // if its not alphabetic, return the original letter, intact
        if (notAlphabetic(origIndex)) return letter;
        // math trick, use the remainder to auto-wrap around the array
        const newIndex = (origIndex + actualShift) % 26;
        return newIndex >= 0
          ? // approach from the left as index is not negative
            ALPHABET_ARR[newIndex]
          : // newIndex is negative here, so we approach from the right
            ALPHABET_ARR[26 + newIndex];
      })
      .join("")
  );
}

module.exports = caesar;

function notAlphabetic(origIndex) {
  return origIndex === -1;
}
