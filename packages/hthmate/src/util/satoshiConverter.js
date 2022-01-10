const SATOSHI_MULTIPLIER = 10 ** 8;

/**
 * Convert satoshis to HTH
 *
 * @param {number} satoshi
 *
 * @returns {number}
 */
function toHth(satoshi) {
  return satoshi / SATOSHI_MULTIPLIER;
}

/**
 * Convert hth to satoshis
 *
 * @param {number} hth
 *
 * @return {number}
 */
function toSatoshi(hth) {
  return hth * SATOSHI_MULTIPLIER;
}

module.exports = {
  toHth,
  toSatoshi,
};
