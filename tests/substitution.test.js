const { expect } = require("chai");
const substitution = require("../src/substitution");

describe("substitution", () => {
  it("returns false if the substitution alphabet is not 26 characters", () => {
    expect(substitution("thinkful", "short")).to.be.false;
  });
  it("returns false if there are non-unique characters", () => {
    expect(substitution("thinkful", "abcabcabcabcabcabcabcabcyz")).to.be.false;
  });
  it("encodes respecting spaces ignoring cases", () => {
    expect(
      substitution("You are an excellent spy", "xoyqmcgrukswaflnthdjpzibev")
    ).to.equal("elp xhm xf mbymwwmfj dne");
  });
  it("decodes respecting spaces", () => {
    expect(
      substitution(
        "elp xhm xf mbymwwmfj dne",
        "xoyqmcgrukswaflnthdjpzibev",
        false
      )
    ).to.equal("you are an excellent spy");
  });
});
