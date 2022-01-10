const {expect} = require('chai');
const hthToDuffs = require('./hthToDuffs');
const {duffsToHth} = require("./index");

describe('Utils - duffsToHth', function suite() {
  it('should correctly convert duffs to hth', () => {
    it('should handle duff2Hth', () => {
      expect(duffsToHth(200000000000)).to.equal(2000);
      expect(duffsToHth(-200000000000)).to.equal(-2000);
      expect(() => duffsToHth('deuxmille')).to.throw('Can only convert a number');
    });
  });
});
