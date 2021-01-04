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
    genCharArray("f", "h"),
    genCharArray("l", "p"),
    genCharArray("q", "u"),
    genCharArray("v", "z"),
  ];
  // fix the second row to match the requirements
  squareArr[1].push("(i/j)");
  squareArr[1].push("k");
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
  return coordinateObjArr
    .map(({ firstDimensionIdx, secondDimensionIdx }) => {
      return POLYBIUS_SQUARE_ARR[firstDimensionIdx][secondDimensionIdx];
    })
    .join("");
}

function wordOfCoordinatesToArrOfCoordinateObjs(wordStr) {
  // reduce a word to an array of coordinates as numbers
  return wordStr.split("").reduce((coordsArr, charStr, indexInt) => {
    // cipher uses a 1 based index system, we use a 0 based index
    let dimensionIndInt = parseInt(charStr) - 1;
    if (indexInt % 2 === 0) {
      // if its the first value, create a new coordinate object with the 2nd
      // dimension index inside and push into array - cipher says they are in
      // reverse order
      coordsArr.push({ secondDimensionIdx: dimensionIndInt });
    } else {
      // otherwise add to the beginning of the last coordinate object the first
      // dimension index because cipher says they are in reverse order
      let lastCoordinateObj = coordsArr[coordsArr.length - 1];
      lastCoordinateObj.firstDimensionIdx = dimensionIndInt;
    }
    return coordsArr;
  }, []);
}

function findSubstitutionFor(letterStr) {
  // I'm using a for loop here because I wish to be able to return
  // early from findSubstitutionFor and I can't do that with a forEach
  // im not using a 'for-of' loop because I want access to the index number
  for (
    let firstDimensionIdxInt = 0;
    firstDimensionIdxInt < POLYBIUS_SQUARE_ARR.length;
    firstDimensionIdxInt++
  ) {
    const subArr = POLYBIUS_SQUARE_ARR[firstDimensionIdxInt];
    const secondDimensionIdxInt = subArr.findIndex((charsStr) => {
      return charsStr.includes(letterStr); // return result of includes
    });

    // if the second index was found
    if (secondDimensionIdxInt !== -1) {
      // cipher rules says to do second dimension first and use a 1 based index
      // so we add 1 to our 0 based index.
      return `${secondDimensionIdxInt + 1}${firstDimensionIdxInt + 1}`;
    }
  }
  throw new Error(`There is no encryption for '${letterStr}'`);
}

function numberOfSpacesIn(inputStr) {
  return inputStr.split(" ").length - 1;
}
