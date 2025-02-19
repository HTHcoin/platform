const { ChainLock } = require('@hthcoin/hthcore-lib');
const {
  tendermint: {
    types: {
      CoreChainLock,
    },
  },
} = require('@hthcoin/abci/types');

/**
 * @typedef decodeChainLock
 * @param {Buffer} buffer - serialized chainLock as buffer
 * @return {ChainLock}
 */
function decodeChainLock(buffer) {
  const coreChainLock = CoreChainLock.decode(buffer);

  return ChainLock.fromObject({
    height: coreChainLock.coreBlockHeight,
    blockHash: coreChainLock.coreBlockHash,
    signature: coreChainLock.signature,
  });
}

module.exports = decodeChainLock;
