const {
  tendermint: {
    abci: {
      ResponseQuery,
    },
  },
} = require('@hthcoin/abci/types');

const cbor = require('cbor');

const {
  v0: {
    GetIdentitiesByPublicKeyHashesResponse,
    Proof,
    ResponseMetadata,
  },
} = require('@hthcoin/dapi-grpc');

const getIdentityFixture = require('@hthcoin/dpp/lib/test/fixtures/getIdentityFixture');

const identitiesByPublicKeyHashesQueryHandlerFactory = require(
  '../../../../../lib/abci/handlers/query/identitiesByPublicKeyHashesQueryHandlerFactory',
);
const BlockExecutionContextMock = require('../../../../../lib/test/mock/BlockExecutionContextMock');
const InvalidArgumentAbciError = require('../../../../../lib/abci/errors/InvalidArgumentAbciError');

describe('identitiesByPublicKeyHashesQueryHandlerFactory', () => {
  let identitiesByPublicKeyHashesQueryHandler;
  let previousPublicKeyIdentityIdRepositoryMock;
  let previousIdentityRepositoryMock;
  let publicKeyHashes;
  let identities;
  let maxIdentitiesPerRequest;
  let previousRootTreeMock;
  let previousIdentitiesStoreRootTreeLeafMock;
  let previousPublicKeyToIdentityIdStoreRootTreeLeafMock;
  let createQueryResponseMock;
  let responseMock;
  let blockExecutionContextMock;
  let previousBlockExecutionContextMock;
  let params;
  let data;

  beforeEach(function beforeEach() {
    previousPublicKeyIdentityIdRepositoryMock = {
      fetchBuffer: this.sinon.stub(),
    };

    previousIdentityRepositoryMock = {
      fetch: this.sinon.stub(),
    };

    previousRootTreeMock = {
      getFullProofForOneLeaf: this.sinon.stub(),
      getProof: this.sinon.stub(),
    };

    previousIdentitiesStoreRootTreeLeafMock = {
      getProof: this.sinon.stub(),
    };
    previousPublicKeyToIdentityIdStoreRootTreeLeafMock = {
      getProof: this.sinon.stub(),
    };

    maxIdentitiesPerRequest = 5;

    createQueryResponseMock = this.sinon.stub();

    responseMock = new GetIdentitiesByPublicKeyHashesResponse();
    responseMock.setProof(new Proof());

    createQueryResponseMock.returns(responseMock);

    blockExecutionContextMock = new BlockExecutionContextMock(this.sinon);
    previousBlockExecutionContextMock = new BlockExecutionContextMock(this.sinon);

    identitiesByPublicKeyHashesQueryHandler = identitiesByPublicKeyHashesQueryHandlerFactory(
      previousPublicKeyIdentityIdRepositoryMock,
      previousIdentityRepositoryMock,
      maxIdentitiesPerRequest,
      previousRootTreeMock,
      previousIdentitiesStoreRootTreeLeafMock,
      previousPublicKeyToIdentityIdStoreRootTreeLeafMock,
      createQueryResponseMock,
      blockExecutionContextMock,
      previousBlockExecutionContextMock,
    );

    publicKeyHashes = [
      Buffer.from('784ca12495d2e61f992db9e55d1f9599b0cf1328', 'hex'),
      Buffer.from('784ca12495d2e61f992db9e55d1f9599b0cf1329', 'hex'),
      Buffer.from('784ca12495d2e61f992db9e55d1f9599b0cf1330', 'hex'),
    ];

    identities = [
      getIdentityFixture(),
      getIdentityFixture(),
    ];

    previousPublicKeyIdentityIdRepositoryMock
      .fetchBuffer
      .withArgs(publicKeyHashes[0])
      .resolves(cbor.encode([identities[0].getId()]));

    previousPublicKeyIdentityIdRepositoryMock
      .fetchBuffer
      .withArgs(publicKeyHashes[1])
      .resolves(cbor.encode([identities[1].getId()]));

    previousIdentityRepositoryMock.fetch
      .withArgs(identities[0].getId())
      .resolves(identities[0]);

    previousIdentityRepositoryMock.fetch
      .withArgs(identities[0].getId())
      .resolves(identities[1]);

    params = {};
    data = { publicKeyHashes };
  });

  it('should return empty response if blockExecutionContext is empty', async () => {
    previousBlockExecutionContextMock.isEmpty.returns(true);

    responseMock = new GetIdentitiesByPublicKeyHashesResponse();
    responseMock.setIdentitiesList([
      cbor.encode([]),
      cbor.encode([]),
      cbor.encode([]),
    ]);
    responseMock.setMetadata(new ResponseMetadata());

    const result = await identitiesByPublicKeyHashesQueryHandler(params, data, {});

    expect(result).to.be.an.instanceof(ResponseQuery);
    expect(result.code).to.equal(0);

    expect(result.value).to.deep.equal(responseMock.serializeBinary());

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer).to.have.not.been.called();
    expect(previousRootTreeMock.getFullProofForOneLeaf).to.have.not.been.called();
  });

  it('should return empty response if previousBlockExecutionContext is empty', async () => {
    previousBlockExecutionContextMock.isEmpty.returns(true);

    responseMock = new GetIdentitiesByPublicKeyHashesResponse();
    responseMock.setIdentitiesList([
      cbor.encode([]),
      cbor.encode([]),
      cbor.encode([]),
    ]);
    responseMock.setMetadata(new ResponseMetadata());

    const result = await identitiesByPublicKeyHashesQueryHandler(params, data, {});

    expect(result).to.be.an.instanceof(ResponseQuery);
    expect(result.code).to.equal(0);

    expect(result.value).to.deep.equal(responseMock.serializeBinary());

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer).to.have.not.been.called();
    expect(previousRootTreeMock.getFullProofForOneLeaf).to.have.not.been.called();
  });

  it('should throw an error if maximum requested items exceeded', async () => {
    maxIdentitiesPerRequest = 1;

    identitiesByPublicKeyHashesQueryHandler = identitiesByPublicKeyHashesQueryHandlerFactory(
      previousPublicKeyIdentityIdRepositoryMock,
      previousIdentityRepositoryMock,
      maxIdentitiesPerRequest,
      previousRootTreeMock,
      previousIdentitiesStoreRootTreeLeafMock,
      previousPublicKeyToIdentityIdStoreRootTreeLeafMock,
      createQueryResponseMock,
      blockExecutionContextMock,
      previousBlockExecutionContextMock,
    );

    try {
      await identitiesByPublicKeyHashesQueryHandler(params, data, {});
      expect.fail('Error was not thrown');
    } catch (e) {
      expect(e).to.be.an.instanceOf(InvalidArgumentAbciError);
      expect(e.getData()).to.deep.equal({
        maxIdentitiesPerRequest,
      });
    }
  });

  it('should return identity id map', async () => {
    const result = await identitiesByPublicKeyHashesQueryHandler(params, data, {});

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.callCount).to.equal(
      publicKeyHashes.length,
    );

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.getCall(0).args).to.deep.equal([
      publicKeyHashes[0],
    ]);

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.getCall(1).args).to.deep.equal([
      publicKeyHashes[1],
    ]);

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.getCall(2).args).to.deep.equal([
      publicKeyHashes[2],
    ]);

    expect(previousIdentityRepositoryMock.fetch.callCount).to.equal(
      identities.length,
    );

    expect(previousIdentityRepositoryMock.fetch.getCall(0).args).to.deep.equal([
      identities[0].getId(),
    ]);

    expect(previousIdentityRepositoryMock.fetch.getCall(1).args).to.deep.equal([
      identities[1].getId(),
    ]);

    expect(result).to.be.an.instanceof(ResponseQuery);
    expect(result.code).to.equal(0);
    expect(result.value).to.deep.equal(responseMock.serializeBinary());
  });

  it('should return identity ids proof', async () => {
    const proof = {
      rootTreeProof: Buffer.from('0100000001f0faf5f55674905a68eba1be2f946e667c1cb5010101', 'hex'),
      storeTreeProof: Buffer.from('03046b657931060076616c75653103046b657932060076616c75653210', 'hex'),
    };

    previousRootTreeMock.getFullProofForOneLeaf.returns(proof);

    const result = await identitiesByPublicKeyHashesQueryHandler(params, data, { prove: true });

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.callCount).to.equal(
      publicKeyHashes.length,
    );

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.getCall(0).args).to.deep.equal([
      publicKeyHashes[0],
    ]);

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.getCall(1).args).to.deep.equal([
      publicKeyHashes[1],
    ]);

    expect(previousPublicKeyIdentityIdRepositoryMock.fetchBuffer.getCall(2).args).to.deep.equal([
      publicKeyHashes[2],
    ]);

    const identityIds = identities.map((identity) => identity.getId());

    expect(result).to.be.an.instanceof(ResponseQuery);
    expect(result.code).to.equal(0);
    expect(result.value).to.deep.equal(responseMock.serializeBinary());
    expect(previousIdentitiesStoreRootTreeLeafMock.getProof).to.have.been.calledOnceWithExactly(
      // Fetch only found identity ids to optimize proof size
      [
        identityIds[0].toBuffer(),
        identityIds[1].toBuffer(),
      ],
    );
    expect(previousRootTreeMock.getProof).to.be.calledOnce();
    expect(previousRootTreeMock.getProof.getCall(0).args).to.deep.equal([[
      previousIdentitiesStoreRootTreeLeafMock,
      previousPublicKeyToIdentityIdStoreRootTreeLeafMock,
    ]]);
  });
});
