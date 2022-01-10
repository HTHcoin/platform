const Hthcore = require('@hthcoin/hthcore-lib');

module.exports = function getNetwork(network) {
  return Hthcore.Networks[network].toString() || Hthcore.Networks.testnet.toString();
};
