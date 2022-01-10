const { duffsToHth } = require('../../../utils');

/**
 * Return the total balance of unconfirmed utxo
 * @param displayDuffs {boolean} True by default. Set the returned format : Duff/hth.
 * @return {number} Balance in hth
 */
function getUnconfirmedBalance(displayDuffs = true) {
  const {
    walletId, storage,
  } = this;
  const accountIndex = this.index;

  const totalSat = storage.calculateDuffBalance(walletId, accountIndex, 'unconfirmed');
  return (displayDuffs) ? totalSat : duffsToHth(totalSat);
}

module.exports = getUnconfirmedBalance;
