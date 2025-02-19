const Hthcore = require('@hthcoin/hthcore-lib');
const { hasProp } = require('../../../utils');

const { testnet } = Hthcore.Networks;
const createWallet = function createWallet(walletId = 'squawk7700', network = testnet.toString(), mnemonic = null, type = null) {
  if (!hasProp(this.store.wallets, walletId)) {
    this.store.wallets[walletId] = {
      accounts: {},
      network,
      mnemonic,
      type,
      identityIds: [],
      addresses: {
        external: {},
        internal: {},
        misc: {},
      },
    };
    this.createChain(network);
    return true;
  }
  return false;
};
module.exports = createWallet;
