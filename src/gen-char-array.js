function genCharArray(startChar, endChar) {

  if (
    typeof startChar !== "string" ||
    typeof endChar !== "string" ||
    startChar.length !== 1 ||
    endChar.length !== 1
    ) {
    // 1. check for bad non single character strings and throw error if found
    throw new Error("invalid inputs, only single letter chars are accepted");
  } else if (startChar >= endChar) {
    // 2. check to make sure startChar comes before end character in ASCI code
    //    order
    throw new Error("startChar must be before endChar by ASCII code");
  }

  // 3. determine number of characters needing generation
  const startCharCode = startChar.charCodeAt();
  const endCharCode = endChar.charCodeAt();
  const letterGenCount = endCharCode - startCharCode + 1;

  // 4. generate the array and return it
  //    we can't map an array with "empty" elements, which is what the Array
  //    constructor does, so we'll fill it with dummy values
  return new Array(letterGenCount).fill(0).map((_el, index) => {
    // an input starting with _ is convention to indicate it is an unused
    // variable in a function

    // 4.a find the new char code, convert to a string and return
    const cur_letter_code = startCharCode + index;
    return String.fromCharCode(cur_letter_code);
  });
}

module.exports = genCharArray;
