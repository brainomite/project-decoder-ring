const { expect } = require("chai");
// const expect = require("chai").expect;
const genCharArray = require("../src/gen-char-array");

describe("genCharArray", () => {
  it("generates an array of characters from start character to end character inclusive", () => {
    expect(genCharArray("a", "c")).to.eql(["a", "b", "c"]);
  });

  // error checking with chai on functions that take in an input requires us
  // to make a function to invoke it with the correct inputs. Chai requires an
  // function to be passed by reference, and not invoked
  // https://www.chaijs.com/api/bdd/#method_throw
  it("throws an error if either input is not a single character string", () => {
    expect(() => genCharArray()).to.throw(
      "invalid inputs, only single letter chars are accepted"
    );
    expect(() => genCharArray("11", 22)).to.throw(
      "invalid inputs, only single letter chars are accepted"
    );
  });
  it("throws an error if start character comes after end character by code", () => {
    expect(() => genCharArray("b", "a")).to.throw(
      "startChar must be before endChar by ASCII code"
    );
  });
});
