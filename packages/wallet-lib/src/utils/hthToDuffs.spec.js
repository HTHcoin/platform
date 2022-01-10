const {expect} = require('chai');
const hthToDuffs = require('./hthToDuffs');
const {duffsToHth} = require("./index");

describe('Utils - hthToDuffs', function suite() {
  it('should correctly convert hth to duffs', () => {
    const results = [
      hthToDuffs(1),
      hthToDuffs(-1),
      hthToDuffs(0.1),
      hthToDuffs(0.01),
      hthToDuffs(0.00000001),
      hthToDuffs(0.000000001),
      hthToDuffs(-0.000000001),
      hthToDuffs(-12345678.9876543210),
    ]
    const expectedResults = [
      100000000,
      -100000000,
      10000000,
      1000000,
      1,
      0,
      -0,
      -1234567898765432
    ]
    results.forEach((result, resultIndex) => {
      expect(results[resultIndex]).to.equal(expectedResults[resultIndex]);
    })
    expect(() => hthToDuffs('deuxmille')).to.throw('Can only convert a number');
  });
});
