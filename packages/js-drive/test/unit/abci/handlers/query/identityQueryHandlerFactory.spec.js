const {
  tendermint: {
    abci: {
      ResponseQuery,
    },
  },
} = require('@hthcoin/abci/types');

const {
  v0: {
    GetIdentityResponse,
    Proof,
  },
} = require('@hthcoin/dapi-grpc');

const getIdentityFixture = require('@hthcoin/dpp/lib/test/fixtures/getIdentityFixture');

const GrpcErrorCodes = require('@hthcoin/grpc-common/lib/server/error/GrpcErrorCodes');
const identityQueryHandlerFactory = require('../../../../../lib/abci/handlers/query/identityQueryHandlerFactory');
const BlockExecutionContextMock = require('../../../../../lib/test/mock/BlockExecutionContextMock');
const NotFoundAbciError = require('../../../../../lib/abci/errors/NotFoundAbciError');

describe('identityQueryHandlerFactory', () => {
  let identityQueryHandler;
  let previousIdentityRepositoryMock;
  let identity;
  let params;
  let data;
  let previousRootTreeMock;
  let previousIdentitiesStoreRootTreeLeafMock;
  let createQueryResponseMock;
  let responseMock;
  let blockExecutionContextMock;
  let previousBlockExecutionContextMock;

  beforeEach(function beforeEach() {
    previousIdentityRepositoryMock = {
      fetch: this.sinon.stub(),
    };

    previousRootTreeMock = {
      getFullProofForOneLeaf: this.sinon.stub(),
    };

    previousIdentitiesStoreRootTreeLeafMock = this.sinon.stub();

    createQueryResponseMock = this.sinon.stub();

    responseMock = new GetIdentityResponse();
    responseMock.setProof(new Proof());

    createQueryResponseMock.returns(responseMock);

    blockExecutionContextMock = new BlockExecutionContextMock(this.sinon);
    previousBlockExecutionContextMock = new BlockExecutionContextMock(this.sinon);

    identityQueryHandler = identityQueryHandlerFactory(
      previousIdentityRepositoryMock,
      previousRootTreeMock,
      previousIdentitiesStoreRootTreeLeafMock,
      createQueryResponseMock,
      blockExecutionContextMock,
      previousBlockExecutionContextMock,
    );

    identity = getIdentityFixture();

    params = {};
    data = {
      id: identity.getId(),
    };
  });

  it('should throw NotFoundAbciError if blockExecutionContext is empty', async () => {
    blockExecutionContextMock.isEmpty.returns(true);

    try {
      await identityQueryHandler(params, data, {});

      expect.fail('should throw NotFoundAbciError');
    } catch (e) {
      expect(e).to.be.an.instanceOf(NotFoundAbciError);
    }
  });

  it('should throw NotFoundAbciError if previousBlockExecutionContext is empty', async () => {
    previousBlockExecutionContextMock.isEmpty.returns(true);

    try {
      await identityQueryHandler(params, data, {});

      expect.fail('should throw NotFoundAbciError');
    } catch (e) {
      expect(e).to.be.an.instanceOf(NotFoundAbciError);
    }
  });

  it('should return serialized identity', async () => {
    previousIdentityRepositoryMock.fetch.resolves(identity);

    const result = await identityQueryHandler(params, data, {});

    expect(previousIdentityRepositoryMock.fetch).to.be.calledOnceWith(data.id);
    expect(result).to.be.an.instanceof(ResponseQuery);
    expect(result.code).to.equal(0);
    expect(result.value).to.deep.equal(responseMock.serializeBinary());
  });

  it('should throw NotFoundAbciError if identity not found', async () => {
    try {
      await identityQueryHandler(params, data, {});

      expect.fail('should throw NotFoundAbciError');
    } catch (e) {
      expect(e).to.be.an.instanceof(NotFoundAbciError);
      expect(e.getCode()).to.equal(GrpcErrorCodes.NOT_FOUND);
      expect(e.message).to.equal('Identity not found');
      expect(previousIdentityRepositoryMock.fetch).to.be.calledOnceWith(data.id);
    }
  });

  it('should return serialized identity with proof', async () => {
    const proof = {
      rootTreeProof: Buffer.from('0100000001f0faf5f55674905a68eba1be2f946e667c1cb5010101', 'hex'),
      storeTreeProof: Buffer.from('03046b657931060076616c75653103046b657932060076616c75653210', 'hex'),
    };

    previousIdentityRepositoryMock.fetch.resolves(identity);
    previousRootTreeMock.getFullProofForOneLeaf.returns(proof);

    const result = await identityQueryHandler(params, data, { prove: true });
    expect(previousIdentityRepositoryMock.fetch).to.be.calledOnceWith(data.id);
    expect(result).to.be.an.instanceof(ResponseQuery);
    expect(result.code).to.equal(0);

    expect(result.value).to.deep.equal(responseMock.serializeBinary());
    expect(previousRootTreeMock.getFullProofForOneLeaf).to.be.calledOnceWith(
      previousIdentitiesStoreRootTreeLeafMock,
      [identity.getId()],
    );
  });
});
