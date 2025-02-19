const {
  v0: {
    ResponseMetadata,
    GetDataContractResponse,
    GetDocumentsResponse,
    GetIdentityResponse,
    BroadcastStateTransitionResponse,
    WaitForStateTransitionResultResponse,
  },
} = require('@hthcoin/dapi-grpc');

const HthPlatformProtocol = require('@hthcoin/dpp');

const getDataContractFixture = require('@hthcoin/dpp/lib/test/fixtures/getDataContractFixture');
const getIdentityFixture = require('@hthcoin/dpp/lib/test/fixtures/getIdentityFixture');

const PlatformMethodsFacade = require('../../../../lib/methods/platform/PlatformMethodsFacade');

describe('PlatformMethodsFacade', () => {
  let grpcTransportMock;
  let platformMethods;

  beforeEach(function beforeEach() {
    grpcTransportMock = {
      request: this.sinon.stub(),
    };

    platformMethods = new PlatformMethodsFacade(grpcTransportMock);
  });

  describe('#broadcastStateTransition', () => {
    it('should broadcast state transition', async () => {
      const response = new BroadcastStateTransitionResponse();
      grpcTransportMock.request.resolves(response);

      const dpp = new HthPlatformProtocol();
      await dpp.initialize();
      const stateTransition = dpp.dataContract.createDataContractCreateTransition(
        getDataContractFixture(),
      );

      await platformMethods.broadcastStateTransition(stateTransition);

      expect(grpcTransportMock.request).to.be.calledOnce();
    });
  });

  describe('#getDataContract', () => {
    it('should get data contract', async () => {
      const response = new GetDataContractResponse();
      response.setMetadata(new ResponseMetadata());
      response.setDataContract(getDataContractFixture().toBuffer());
      grpcTransportMock.request.resolves(response);

      await platformMethods.getDataContract(getDataContractFixture().getId());

      expect(grpcTransportMock.request).to.be.calledOnce();
    });
  });

  describe('#getDocuments', () => {
    it('should get documents', async () => {
      const response = new GetDocumentsResponse();
      response.setMetadata(new ResponseMetadata());
      grpcTransportMock.request.resolves(response);

      await platformMethods.getDocuments(
        '11c70af56a763b05943888fa3719ef56b3e826615fdda2d463c63f4034cb861c',
        'niceDocument',
      );

      expect(grpcTransportMock.request).to.be.calledOnce();
    });
  });

  describe('#getIdentity', () => {
    it('should get Identity', async () => {
      const response = new GetIdentityResponse();

      response.setMetadata(new ResponseMetadata());
      response.setIdentity(getIdentityFixture().toBuffer());

      grpcTransportMock.request.resolves(response);

      await platformMethods.getIdentity('41nthkqvHBLnqiMkSbsdTNANzYu9bgdv4etKoRUunY1M');

      expect(grpcTransportMock.request).to.be.calledOnce();
    });
  });

  describe('#waitForStateTransitionResult', () => {
    it('should wait for state transition', async () => {
      const response = new WaitForStateTransitionResultResponse();
      response.setMetadata(new ResponseMetadata());
      grpcTransportMock.request.resolves(response);

      await platformMethods.waitForStateTransitionResult(
        Buffer.from('6f49655a2906852a38e473dd47574fb70b8b7c4e5cee9ea8e7da3f07b970c421', 'hex'),
        false,
      );

      expect(grpcTransportMock.request).to.be.calledOnce();
    });
  });
});
