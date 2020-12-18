function genCharArray(startChar, endChar) {
  if (
    typeof startChar !== "string" ||
    typeof endChar !== "string" ||
    startChar.length !== 1 ||
    endChar.length !== 1
  ) {
    throw new Error("invalid inputs, only single letter chars are accepted");
  } else if (startChar >= endChar) {
    throw new Error("startChar must be before endChar by ASCII code");
  }
  const startCharCode = startChar.charCodeAt();
  const endCharCode = endChar.charCodeAt();
  const letterGenCount = endCharCode - startCharCode + 1;
  return new Array(letterGenCount).fill(0).map((_el, index) => {
    const cur_letter_code = startCharCode + index;
    return String.fromCharCode(cur_letter_code);
  });
}

module.exports = genCharArray;
