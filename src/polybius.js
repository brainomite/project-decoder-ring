const genCharArray = require("./gen-char-array");

/*
  The right side of this expression a function wrapped in parens
  i.e. (function (){...})()  this is known as an IIFE (pronounced
  iffy, and stands for Immediately Invoked Function Expression).
  This is a design pattern that indicates the function will be run immediately at the time of definition. It also indicates
  that the function will only be used once. Read more here:
  https://developer.mozilla.org/en-US/docs/Glossary/IIFE

  In this case I am creating a global constant with this IIFE
*/

const POLYBIUS_SQUARE = (function () {
  // create basic array
  const squareArray = [
    genCharArray("a", "e"),
    genCharArray("f", "j"),
    genCharArray("l", "p"),
    genCharArray("q", "u"),
    genCharArray("v", "z"),
  ];
  // fix the second row to match the requirements
  squareArray[1][3] = ["i", "j"];
  squareArray[1][4] = "k";
  return squareArray;
})();

function polybius(input, encode = true) {
  if (encode) {
    return encodingOf(input);
  } else {
    if ((input.length - numberOfSpacesIn(input)) % 2 !== 0) {
      return false;
    }
    return decodingOf(input);
  }
}
module.exports = polybius;

function encodingOf(input) {
  return input
    .toLowerCase()
    .split("")
    // map each character to its 2 digit coordinate and return the new
    // combined string
    .map((char) => {
      return char === " " ? " " : findSubstitutionFor(char);
    }).join("");
}

function decodingOf(input) {
  return (
    input
      // split into words
      .split(" ")
      // map encoded word into array of coordinates
      .map(wordToCoordinates)
      // map the coordinates to a decrypted word string
      .map(coordinatesToWord)
      // join words into phrase and return
      .join(" ")
  );
}

function coordinatesToWord(coordinateArray) {
  // map each coordinate to a character and join to a word
  return coordinateArray.map(coordinateToChar).join("");
}

function coordinateToChar([firstDimInd, secondDimInd]) {
  // grab the character or array of characters
  const charOrArrayOfChars = POLYBIUS_SQUARE[firstDimInd][secondDimInd];
  return typeof charOrArrayOfChars === "string"
    ? charOrArrayOfChars // its a character
    : `(${charOrArrayOfChars.join("/")})`; // its an array of characters
}

function wordToCoordinates(word) {
  // reduce a word to an array of coordinates as numbers
  return word.split("").reduce((coords, char, index) => {
    // cipher uses a 1 based index system, we use a 0 based index
    let dimensionIndex = parseInt(char) - 1;
    if (index % 2 === 0) {
      // if its the first value, create a new coordinate array with the 2nd
      // dimension index inside and push into array - cipher says they are in
      // reverse order
      coords.push([dimensionIndex]);
    } else {
      // otherwise add to the beginning of the last coordinate array the first
      // dimension index because cipher says they are in reverse order
      let LastCoordinateArr = coords[coords.length - 1];
      LastCoordinateArr.unshift(dimensionIndex);
    }
    return coords;
  }, []);
}

function findSubstitutionFor(letter) {
  // I'm using a for loop here because I whish to be able to return
  // early and I can't do that with a forEach
  for (
    let firstDimensionIdx = 0;
    firstDimensionIdx < POLYBIUS_SQUARE.length;
    firstDimensionIdx++
  ) {
    const subArr = POLYBIUS_SQUARE[firstDimensionIdx];
    const secondDimensionIdx = subArr.findIndex((actualValue) => {
      return typeof actualValue === "string"
        ? actualValue === letter
        : actualValue.includes(letter);
    });
    if (secondDimensionIdx !== -1) {
      // cipher rules says to do second dimension first
      return `${secondDimensionIdx + 1}${firstDimensionIdx + 1}`;
    }
  }
  throw new Error(`There is no encryption for '${letter}'`);
}

function numberOfSpacesIn(inputStr) {
  return inputStr.split("").reduce((accum, char) => {
    return char === " " ? accum + 1 : accum;
  }, 0);
}
