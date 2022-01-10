const HTH = require('hth');

const getDAPISeeds = require('./getDAPISeeds');

function createClientWithoutWallet() {
  return new HTH.Client({
    seeds: getDAPISeeds(),
    network: process.env.NETWORK,
    apps: {
      dpns: {
        contractId: process.env.DPNS_CONTRACT_ID,
      },
    },
  });
}

module.exports = createClientWithoutWallet;
