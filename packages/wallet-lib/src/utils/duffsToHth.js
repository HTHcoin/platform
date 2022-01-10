const { DUFFS_PER_HTH } = require('../CONSTANTS');

function duffsToHth(duffs) {
  if (duffs === undefined || duffs.constructor.name !== Number.name) {
    throw new Error('Can only convert a number');
  }
  return duffs / DUFFS_PER_HTH;
}
module.exports = duffsToHth;
