const { expect } = require("chai");
const polybius = require("../src/polybius");

describe("polybius", () => {
  it("encrypts ignoring cases and maintaining spaces", () => {
    expect(polybius("thinkful")).to.equal("4432423352125413");
    expect(polybius("Hello world")).to.equal("3251131343 2543241341");
    expect(polybius("hello world")).to.equal("3251131343 2543241341");
  });
  it("returns false if excluding spaces, there are odd characters during decryption", () => {
    expect(polybius("44324233521254134", false)).to.be.false;
    expect(polybius("443242334 21254134", false)).to.be.false;
  });
  it("decrypts correctly", () => {
    expect(polybius("3251131343 2543241341", false)).to.equal("hello world");
    expect(polybius("4432423352125413", false)).to.equal("th(i/j)nkful");
  });
});
