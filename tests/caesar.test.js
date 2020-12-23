const { expect } = require("chai");
const caesar = require("../src/caesar");

describe("caesar", () => {
  it("Should return false if the shift value is not present, equal to 0, less than -25, or greater than 25.", () => {
    expect(caesar("test")).to.be.false;
    expect(caesar("test", 0)).to.be.false;
    expect(caesar("test", -30)).to.be.false;
    expect(caesar("test", 28)).to.be.false;
  });
  it("Shifts in the negative direction ignoring non-alphabetic characters", () => {
    expect(caesar("Apple MacBook", -3)).to.equal("xmmib jxzyllh");
  });
  it("Maintains non-alphabetic characters while shifting in positive direction", () => {
    const expectedStr = caesar("This is a secret message!", 8);
    expect(expectedStr).to.equal("bpqa qa i amkzmb umaaiom!");
  });
  it("Should be able to decode, respecting special characters and ignoring cases", () => {
    const expectedStr = caesar("BPQA qa I amkzmb umaaiom!", 8, false);
    expect(expectedStr).to.equal("this is a secret message!");
  });
});
