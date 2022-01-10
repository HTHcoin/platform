const WalletLibError = require('./WalletLibError');

class InvalidHthcoreTransaction extends WalletLibError {
  constructor(tx, reason = 'A Hthcore Transaction object or valid rawTransaction is required') {
    super(`${reason}: ${tx.toString()}`);
  }
}

module.exports = InvalidHthcoreTransaction;
