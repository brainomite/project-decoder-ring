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

const POLYBIUS_SQUARE_ARR = (function () {
  // create basic array
  const squareArr = [
    genCharArray("a", "e"),
    genCharArray("f", "j"),
    genCharArray("l", "p"),
    genCharArray("q", "u"),
    genCharArray("v", "z"),
  ];
  // fix the second row to match the requirements
  squareArr[1][3] = ["i", "j"];
  squareArr[1][4] = "k";
  return squareArr;
})();

function polybius(inputStr, encodeBool = true) {
  // ignoring spaces, do we have even number of characters?
  if (!encodeBool && (inputStr.length - numberOfSpacesIn(inputStr)) % 2 !== 0) {
    return false;
  }

  if (encodeBool) {
    return encodingOf(inputStr);
  } else {
    return decodingOf(inputStr);
  }
}
module.exports = polybius;

function encodingOf(inputStr) {
  return (
    inputStr
      .toLowerCase()
      .split("")
      // map each character to its 2 digit coordinate and return the new
      // combined string
      .map((char) => (char === " " ? " " : findSubstitutionFor(char)))
      .join("")
  );
}

function decodingOf(inputStr) {
  return (
    // note: i mapped twice to break down the problem
    inputStr
      // split into words
      .split(" ")
      // map encoded word into array of coordinates
      .map(wordOfCoordinatesToArrOfCoordinateObjs)
      // map the coordinates to a decrypted word string
      .map(ArrOfCoordinateObjsToWord)
      // join words into phrase and return
      .join(" ")
  );
}

function ArrOfCoordinateObjsToWord(coordinateObjArr) {
  // map each coordinate to a character and join to a word
  return coordinateObjArr.map(coordinateObjToChar).join("");
}

function coordinateObjToChar({ firstDimensionIdx, secondDimensionIdx }) {
  // grab the character or array of characters
  const charStrOrArrayOfChars =
    POLYBIUS_SQUARE_ARR[firstDimensionIdx][secondDimensionIdx];
  // if its a string, return it if its an array, join as per specs and return
  // with parens around within the new string
  return typeof charStrOrArrayOfChars === "string"
    ? charStrOrArrayOfChars // its a character
    : `(${charStrOrArrayOfChars.join("/")})`; // its an array of characters
}

function wordOfCoordinatesToArrOfCoordinateObjs(wordStr) {
  // reduce a word to an array of coordinates as numbers
  return wordStr.split("").reduce((coordsArr, charStr, indexInt) => {
    // cipher uses a 1 based index system, we use a 0 based index
    let dimensionIndInt = parseInt(charStr) - 1;
    if (indexInt % 2 === 0) {
      // if its the first value, create a new coordinate array with the 2nd
      // dimension index inside and push into array - cipher says they are in
      // reverse order
      coordsArr.push({ secondDimensionIdx: dimensionIndInt });
    } else {
      // otherwise add to the beginning of the last coordinate array the first
      // dimension index because cipher says they are in reverse order
      let lastCoordinateObj = coordsArr[coordsArr.length - 1];
      lastCoordinateObj.firstDimensionIdx = dimensionIndInt;
    }
    return coordsArr;
  }, []);
}

function findSubstitutionFor(letterStr) {
  // I'm using a for loop here because I wish to be able to return
  // early and I can't do that with a forEach
  // im not using 'for-in' loop because I want access to the index number
  for (
    let firstDimensionIdxInt = 0;
    firstDimensionIdxInt < POLYBIUS_SQUARE_ARR.length;
    firstDimensionIdxInt++
  ) {
    const subArr = POLYBIUS_SQUARE_ARR[firstDimensionIdxInt];
    const secondDimensionIdxInt = subArr.findIndex((charStrOrCharStrArr) => {
      // if its a string
      return typeof charStrOrCharStrArr === "string"
        ? charStrOrCharStrArr === letterStr // return whether the string matches
        : charStrOrCharStrArr.includes(letterStr); // return result of includes
    });
    if (secondDimensionIdxInt !== -1) {
      // cipher rules says to do second dimension first and use a 1 based index
      // so we add 1 to our 0 based index.
      return `${secondDimensionIdxInt + 1}${firstDimensionIdxInt + 1}`;
    }
  }
  throw new Error(`There is no encryption for '${letterStr}'`);
}

function numberOfSpacesIn(inputStr) {
  return inputStr.split("").reduce((countOfSpacesInt, charStr) => {
    return charStr === " " ? countOfSpacesInt + 1 : countOfSpacesInt;
  }, 0);
}
