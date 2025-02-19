/* eslint-disable no-continue, no-restricted-syntax */
const { Address, Transaction } = require('@hthcoin/hthcore-lib');
const { WALLET_TYPES, COINBASE_MATURITY } = require('../../../CONSTANTS');

/**
 * Return all the utxos
 * @param {getUTXOSOptions} options - Options object
 * @param {Number} [options.coinbaseMaturity] - Allow to override coinbase maturity
 * @return {UnspentOutput[]}
 */
function getUTXOS(options = {
  coinbaseMaturity: COINBASE_MATURITY,
}) {
  const self = this;
  const {
    walletId,
    network,
    BIP44PATH,
    walletType,
  } = this;

  const utxos = [];
  const isHDWallet = [WALLET_TYPES.HDPUBLIC, WALLET_TYPES.HDWALLET].includes(walletType);

  const currentBlockHeight = this.store.chains[network].blockHeight;

  for (const addressType in this.store.wallets[walletId].addresses) {
    if (!addressType || !['external', 'internal', 'misc'].includes(addressType)) {
      continue;
    }
    for (const path in self.store.wallets[walletId].addresses[addressType]) {
      if (!path) continue;
      const address = self.store.wallets[walletId].addresses[addressType][path];

      if (isHDWallet && !path.startsWith(BIP44PATH)) continue;

      for (const identifier in address.utxos) {
        if (!identifier) continue;
        const [txid, outputIndex] = identifier.split('-');
        const transaction = new Transaction(this.store.transactions[txid]);

        if (transaction.isCoinbase()) {
          // If the transaction is not a special transaction, we can't check its
          // maturity at the moment of writing this comment.
          // The wallet library doesn't maintain the header chain and thus we can
          // figure out the height only from the payload, but old coinbase transactions
          // doesn't have a payload.
          if (!transaction.isSpecialTransaction()) {
            continue;
          }

          const transactionHeight = (this.store.transactionsMetadata[txid])
            ? this.store.transactionsMetadata[txid].height
            : transaction.extraPayload.height;

          // We check maturity is at least 100 blocks.
          // another way is to just read _scriptBuffer height value.
          if (transactionHeight + options.coinbaseMaturity > currentBlockHeight) {
            continue;
          }
        }

        utxos.push(new Transaction.UnspentOutput(
          {
            txId: txid,
            vout: parseInt(outputIndex, 10),
            script: address.utxos[identifier].script,
            satoshis: address.utxos[identifier].satoshis,
            address: new Address(address.address, network),
          },
        ));
      }
    }
  }
  return utxos.sort((a, b) => b.satoshis - a.satoshis);
}

module.exports = getUTXOS;
