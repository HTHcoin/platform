const { DUFFS_PER_HTH } = require('../CONSTANTS');

function hthToDuffs(hth) {
  if (hth === undefined || hth.constructor.name !== Number.name) {
    throw new Error('Can only convert a number');
  }
  return parseInt((hth * DUFFS_PER_HTH).toFixed(0), 10);
}
module.exports = hthToDuffs;
