const HTH = require('hth');

const fundWallet = require('@hthcoin/wallet-lib/src/utils/fundWallet');

const getDAPISeeds = require('./getDAPISeeds');

const createFaucetClient = require('./createFaucetClient');

/**
 * Create and fund HthJS client
 * @param {string} [HDPrivateKey]
 *
 * @returns {Promise<Client>}
 */
async function createClientWithFundedWallet(HDPrivateKey = undefined) {
  const seeds = getDAPISeeds();

  const clientOpts = {
    seeds,
    network: process.env.NETWORK,
    apps: {
      dpns: {
        contractId: process.env.DPNS_CONTRACT_ID,
      },
    },
  };

  const faucetClient = createFaucetClient();

  const walletOptions = {
    waitForInstantLockTimeout: 120000,
  };

  if (process.env.SKIP_SYNC_BEFORE_HEIGHT && HDPrivateKey) {
    walletOptions.unsafeOptions = {
      skipSynchronizationBeforeHeight: process.env.SKIP_SYNC_BEFORE_HEIGHT,
    };
  }

  if (HDPrivateKey) {
    walletOptions.HDPrivateKey = HDPrivateKey;
  } else {
    walletOptions.mnemonic = null;
  }

  const client = new HTH.Client({
    ...clientOpts,
    wallet: walletOptions,
  });

  const amount = 40000;

  await fundWallet(faucetClient.wallet, client.wallet, amount);

  return client;
}

module.exports = createClientWithFundedWallet;
