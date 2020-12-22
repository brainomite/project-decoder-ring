const { expect } = require("chai");
const caesar = require("../src/caesar");

describe("caesar", () => {
  it("Should return false if the shift value is not present, equal to 0, less than -25, or greater than 25.", () => {
    expect(caesar("test")).to.be.false;
    expect(caesar("test", 0)).to.be.false;
    expect(caesar("test", -30)).to.be.false;
    expect(caesar("test", 28)).to.be.false;
  });
  it("Shifts in the positive direction", () => {
    expect(caesar("thinkful", 3)).to.equal("wklqnixo");
  });
  it("Shifts in the negative direction", () => {
    expect(caesar("thinkful", -3)).to.equal("qefkhcri");
    expect(caesar("a", -1)).to.equal("z");
  });
  it("Ignores case of the input", () => {
    expect(caesar("THINKful", 3)).to.equal("wklqnixo");
  });
  it("Maintains non-alphabetic characters", () => {
    expect(caesar("This is a secret message!", 8)).to.equal(
      "bpqa qa i amkzmb umaaiom!"
    );
  });
  it("Should be able to decode", () => {
    expect(caesar("wklqnixo", 3, false)).to.equal("thinkful");
    expect(caesar("BPQA qa I amkzmb umaaiom!", 8, false)).to.equal(
      "this is a secret message!"
    );
  });
});
