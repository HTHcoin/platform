const lodashMerge = require('lodash.merge');

const {
  NETWORK_MAINNET,
} = require('../../src/constants');

const baseConfig = require('./base');

const mainnetConfig = lodashMerge({}, baseConfig, {
  description: 'node with mainnet configuration',
  core: {
    p2p: {
      port: 9999,
    },
    rpc: {
      port: 9998,
    },
  },
  network: NETWORK_MAINNET,
});

delete mainnetConfig.platform;

module.exports = mainnetConfig;
