function genCharArray(startCharStr, endCharStr) {
  if (
    typeof startCharStr !== "string" ||
    typeof endCharStr !== "string" ||
    startCharStr.length !== 1 ||
    endCharStr.length !== 1
  ) {
    // 1. check for bad non single character strings and throw error if found
    throw new Error("invalid inputs, only single letter chars are accepted");
  } else if (startCharStr >= endCharStr) {
    // 2. check to make sure startChar comes before end character in ASCI code
    //    order
    throw new Error("startChar must be before endChar by ASCII code");
  }

  // 3. determine number of characters needing generation inclusive of the end
  const startCharCodeInt = startCharStr.charCodeAt();
  const endCharCodeInt = endCharStr.charCodeAt();
  const letterGenCountInt = endCharCodeInt - startCharCodeInt + 1;

  /*
    4. generate the array by instantiating a new array and mapping the elements
       to the correct values and return it.

       we can't map an empty array even though it has a correct length, which
       is what the Array constructor does, see the documentation here:
       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array

       Map iterates over the values, and doesn't look at the length, therefore
       we'll fill it with dummy values then map over them
  */
  return new Array(letterGenCountInt).fill().map((_el, indexInt) => {
    // since this array is filled with dummy values, and we don't care about
    // the value itself, we'll name an input starting with _ is convention
    // to indicate it is an unused input variable in a function

    // in unicode, the latin alphabet is sequential code wise
    // https://en.wikipedia.org/wiki/List_of_Unicode_characters#Basic_Latin

    const relativeLetterCodeInt = startCharCodeInt + indexInt;
    // turn the code back into a string
    return String.fromCharCode(relativeLetterCodeInt);
  });
}

module.exports = genCharArray;
