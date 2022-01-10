const { duffsToHth } = require('../../../utils');

/**
 * Return the total balance of an account (confirmed + unconfirmed).
 * @param displayDuffs {boolean} True by default. Set the returned format : Duff/hth.
 * @return {number} Balance in hth
 */
function getTotalBalance(displayDuffs = true) {
  const {
    walletId, storage, index,
  } = this;
  const totalSat = storage.calculateDuffBalance(walletId, index, 'total');
  return (displayDuffs) ? totalSat : duffsToHth(totalSat);
}

module.exports = getTotalBalance;
