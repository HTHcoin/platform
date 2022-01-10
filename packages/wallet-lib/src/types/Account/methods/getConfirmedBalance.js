const { duffsToHth } = require('../../../utils');

/**
 * Return the confirmed balance of an account.
 * @param {boolean} [displayDuffs=true] - Set the returned format : Duff/hth.
 * @return {number} Balance in hth
 */
function getConfirmedBalance(displayDuffs = true) {
  const {
    walletId, storage,
  } = this;
  const accountIndex = this.index;
  const totalSat = storage.calculateDuffBalance(walletId, accountIndex, 'confirmed');
  return (displayDuffs) ? totalSat : duffsToHth(totalSat);
}

module.exports = getConfirmedBalance;
