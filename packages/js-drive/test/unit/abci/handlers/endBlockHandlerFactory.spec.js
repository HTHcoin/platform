const {
  tendermint: {
    abci: {
      ResponseEndBlock,
      ValidatorSetUpdate,
    },
    types: {
      CoreChainLock,
    },
  },
} = require('@hthcoin/abci/types');

const Long = require('long');

const generateRandomIdentifier = require('@hthcoin/dpp/lib/test/utils/generateRandomIdentifier');

const endBlockHandlerFactory = require('../../../../lib/abci/handlers/endBlockHandlerFactory');

const BlockExecutionContextMock = require('../../../../lib/test/mock/BlockExecutionContextMock');
const NoSystemContractFoundError = require('../../../../lib/abci/handlers/errors/NoSystemContractFoundError');
const LoggerMock = require('../../../../lib/test/mock/LoggerMock');
const BlockExecutionDBTransactionsMock = require('../../../../lib/test/mock/BlockExecutionStoreTransactionsMock');

describe('endBlockHandlerFactory', () => {
  let endBlockHandler;
  let requestMock;
  let headerMock;
  let lastCommitInfoMock;
  let blockExecutionContextMock;
  let dpnsContractId;
  let dpnsContractBlockHeight;
  let hthcoinContractId;
  let hthcoinContractBlockHeight;
  let latestCoreChainLockMock;
  let loggerMock;
  let createValidatorSetUpdateMock;
  let chainLockMock;
  let validatorSetMock;
  let getFeatureFlagForHeightMock;
  let blockExecutionStoreTransactionsMock;
  let featureFlagDataContractId;
  let featureFlagDataContractBlockHeight;
  let masternodeRewardSharesContractId;
  let masternodeRewardSharesContractBlockHeight;

  beforeEach(function beforeEach() {
    headerMock = {
      coreChainLockedHeight: 2,
      version: {
        app: Long.fromInt(1),
      },
    };

    lastCommitInfoMock = {
      stateSignature: Uint8Array.from('003657bb44d74c371d14485117de43313ca5c2848f3622d691c2b1bf3576a64bdc2538efab24854eb82ae7db38482dbd15a1cb3bc98e55173817c9d05c86e47a5d67614a501414aae6dd1565e59422d1d77c41ae9b38de34ecf1e9f778b2a97b'),
    };

    blockExecutionContextMock = new BlockExecutionContextMock(this.sinon);

    blockExecutionContextMock.hasDataContract.returns(true);
    blockExecutionContextMock.getHeader.returns(headerMock);
    blockExecutionContextMock.getLastCommitInfo.returns(lastCommitInfoMock);

    chainLockMock = {
      height: 1,
      blockHash: Buffer.alloc(0),
      signature: Buffer.alloc(0),
    };

    latestCoreChainLockMock = {
      getChainLock: this.sinon.stub().returns(chainLockMock),
    };

    loggerMock = new LoggerMock(this.sinon);

    dpnsContractId = generateRandomIdentifier();
    dpnsContractBlockHeight = 2;

    hthcoinContractId = generateRandomIdentifier();
    hthcoinContractBlockHeight = 2;

    validatorSetMock = {
      rotate: this.sinon.stub(),
      getQuorum: this.sinon.stub(),
    };

    createValidatorSetUpdateMock = this.sinon.stub();

    blockExecutionStoreTransactionsMock = new BlockExecutionDBTransactionsMock(this.sinon);

    getFeatureFlagForHeightMock = this.sinon.stub().resolves(null);

    endBlockHandler = endBlockHandlerFactory(
      blockExecutionContextMock,
      dpnsContractBlockHeight,
      dpnsContractId,
      hthcoinContractBlockHeight,
      hthcoinContractId,
      latestCoreChainLockMock,
      validatorSetMock,
      createValidatorSetUpdateMock,
      loggerMock,
      getFeatureFlagForHeightMock,
      blockExecutionStoreTransactionsMock,
      featureFlagDataContractId,
      featureFlagDataContractBlockHeight,
      masternodeRewardSharesContractId,
      masternodeRewardSharesContractBlockHeight,
    );

    requestMock = {
      height: Long.fromInt(dpnsContractBlockHeight),
    };
  });

  it('should return a response', async () => {
    endBlockHandler = endBlockHandlerFactory(
      blockExecutionContextMock,
      undefined,
      undefined,
      undefined,
      undefined,
      latestCoreChainLockMock,
      validatorSetMock,
      createValidatorSetUpdateMock,
      loggerMock,
      getFeatureFlagForHeightMock,
      blockExecutionStoreTransactionsMock,
      featureFlagDataContractId,
      featureFlagDataContractBlockHeight,
      masternodeRewardSharesContractId,
      masternodeRewardSharesContractBlockHeight,
    );

    const response = await endBlockHandler(requestMock);

    expect(response).to.be.an.instanceOf(ResponseEndBlock);
    expect(response.toJSON()).to.be.empty();

    expect(blockExecutionContextMock.hasDataContract).to.not.have.been.called();
  });

  it('should return a response if DPNS contract is present at specified height', async () => {
    endBlockHandler = endBlockHandlerFactory(
      blockExecutionContextMock,
      dpnsContractBlockHeight,
      dpnsContractId,
      undefined,
      undefined,
      latestCoreChainLockMock,
      validatorSetMock,
      createValidatorSetUpdateMock,
      loggerMock,
      getFeatureFlagForHeightMock,
      blockExecutionStoreTransactionsMock,
      featureFlagDataContractId,
      featureFlagDataContractBlockHeight,
      masternodeRewardSharesContractId,
      masternodeRewardSharesContractBlockHeight,
    );

    const response = await endBlockHandler(requestMock);

    expect(response).to.be.an.instanceOf(ResponseEndBlock);

    expect(response.toJSON()).to.be.empty();

    expect(blockExecutionContextMock.hasDataContract).to.have.been.calledOnceWithExactly(
      dpnsContractId,
    );
  });

  it('should throw and error if DPNS contract is not present at specified height', async () => {
    endBlockHandler = endBlockHandlerFactory(
      blockExecutionContextMock,
      dpnsContractBlockHeight,
      dpnsContractId,
      undefined,
      undefined,
      latestCoreChainLockMock,
      validatorSetMock,
      createValidatorSetUpdateMock,
      loggerMock,
      getFeatureFlagForHeightMock,
      blockExecutionStoreTransactionsMock,
      featureFlagDataContractId,
      featureFlagDataContractBlockHeight,
      masternodeRewardSharesContractId,
      masternodeRewardSharesContractBlockHeight,
    );

    blockExecutionContextMock.hasDataContract.returns(false);

    try {
      await endBlockHandler(requestMock);

      expect.fail('Error was not thrown');
    } catch (e) {
      expect(e).to.be.an.instanceOf(NoSystemContractFoundError);
      expect(e.getContractId()).to.equal(dpnsContractId);
      expect(e.getHeight()).to.equal(dpnsContractBlockHeight);

      expect(blockExecutionContextMock.hasDataContract).to.have.been.calledOnceWithExactly(
        dpnsContractId,
      );

      expect(latestCoreChainLockMock.getChainLock).to.have.not.been.called();
    }
  });

  it('should return a response if HthCoin contract is present at specified height', async () => {
    endBlockHandler = endBlockHandlerFactory(
      blockExecutionContextMock,
      undefined,
      undefined,
      hthcoinContractBlockHeight,
      hthcoinContractId,
      latestCoreChainLockMock,
      validatorSetMock,
      createValidatorSetUpdateMock,
      loggerMock,
      getFeatureFlagForHeightMock,
      blockExecutionStoreTransactionsMock,
      featureFlagDataContractId,
      featureFlagDataContractBlockHeight,
      masternodeRewardSharesContractId,
      masternodeRewardSharesContractBlockHeight,
    );

    const response = await endBlockHandler(requestMock);

    expect(response).to.be.an.instanceOf(ResponseEndBlock);

    expect(response.toJSON()).to.be.empty();

    expect(blockExecutionContextMock.hasDataContract).to.have.been.calledOnceWithExactly(
      hthcoinContractId,
    );
  });

  it('should throw and error if HthCoin contract is not present at specified height', async () => {
    endBlockHandler = endBlockHandlerFactory(
      blockExecutionContextMock,
      undefined,
      undefined,
      hthcoinContractBlockHeight,
      hthcoinContractId,
      latestCoreChainLockMock,
      validatorSetMock,
      createValidatorSetUpdateMock,
      loggerMock,
      getFeatureFlagForHeightMock,
      blockExecutionStoreTransactionsMock,
      featureFlagDataContractId,
      featureFlagDataContractBlockHeight,
      masternodeRewardSharesContractId,
      masternodeRewardSharesContractBlockHeight,
    );

    blockExecutionContextMock.hasDataContract.returns(false);

    try {
      await endBlockHandler(requestMock);

      expect.fail('Error was not thrown');
    } catch (e) {
      expect(e).to.be.an.instanceOf(NoSystemContractFoundError);
      expect(e.getContractId()).to.equal(hthcoinContractId);
      expect(e.getHeight()).to.equal(hthcoinContractBlockHeight);

      expect(blockExecutionContextMock.hasDataContract).to.have.been.calledOnceWithExactly(
        hthcoinContractId,
      );

      expect(latestCoreChainLockMock.getChainLock).to.have.not.been.called();
    }
  });

  it('should return nextCoreChainLockUpdate if latestCoreChainLock above header height', async () => {
    chainLockMock.height = 3;

    const response = await endBlockHandler(requestMock);

    expect(latestCoreChainLockMock.getChainLock).to.have.been.calledOnceWithExactly();

    const expectedCoreChainLock = new CoreChainLock({
      coreBlockHeight: chainLockMock.height,
      coreBlockHash: chainLockMock.blockHash,
      signature: chainLockMock.signature,
    });

    expect(response.nextCoreChainLockUpdate).to.deep.equal(expectedCoreChainLock);
    expect(response.validatorSetUpdate).to.be.null();
  });

  it('should rotate validator set and return ValidatorSetUpdate if height is divisible by ROTATION_BLOCK_INTERVAL', async () => {
    requestMock = {
      height: Long.fromInt(15),
    };

    validatorSetMock.rotate.resolves(true);

    const quorumHash = Buffer.alloc(64).fill(1).toString('hex');
    validatorSetMock.getQuorum.returns({
      quorumHash,
    });

    const validatorSetUpdate = new ValidatorSetUpdate();

    createValidatorSetUpdateMock.returns(validatorSetUpdate);

    const response = await endBlockHandler(requestMock);

    expect(response).to.be.an.instanceOf(ResponseEndBlock);

    expect(validatorSetMock.rotate).to.be.calledOnceWithExactly(
      requestMock.height,
      chainLockMock.height,
      Buffer.from(lastCommitInfoMock.stateSignature),
    );

    expect(createValidatorSetUpdateMock).to.be.calledOnceWithExactly(validatorSetMock);

    expect(response.validatorSetUpdate).to.be.equal(validatorSetUpdate);
  });

  it('should return consensusParamUpdates if request contains update consensus features flag', async function it() {
    const getLatestFeatureFlagGetMock = this.sinon.stub();
    getLatestFeatureFlagGetMock.withArgs('block').returns({
      maxBytes: 1,
      maxGas: 2,
    });
    getLatestFeatureFlagGetMock.withArgs('evidence').returns({
      maxAgeNumBlocks: 1,
      maxAgeDuration: null,
      maxBytes: 2,
    });
    getLatestFeatureFlagGetMock.withArgs('version').returns({
      appVersion: 1,
    });

    getFeatureFlagForHeightMock.resolves({
      get: getLatestFeatureFlagGetMock,
    });

    const response = await endBlockHandler(requestMock);

    expect(response).to.be.an.instanceOf(ResponseEndBlock);

    expect(response.toJSON()).to.deep.equal({
      consensusParamUpdates: {
        block: {
          maxBytes: '1',
          maxGas: '2',
        },
        evidence: {
          maxAgeNumBlocks: '1',
          maxBytes: '2',
        },
        version: {
          appVersion: '1',
        },
      },
    });

    expect(blockExecutionStoreTransactionsMock.getTransaction).to.be.calledOnce();
    expect(getFeatureFlagForHeightMock).to.be.calledOnce();
  });
});
