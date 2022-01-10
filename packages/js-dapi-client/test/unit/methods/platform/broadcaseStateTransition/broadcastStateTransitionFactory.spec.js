const {
  v0: {
    BroadcastStateTransitionRequest,
    PlatformPromiseClient,
  },
} = require('@hthcoin/dapi-grpc');

const HthPlatformProtocol = require('@hthcoin/dpp');

const getDataContractFixture = require('@hthcoin/dpp/lib/test/fixtures/getDataContractFixture');

const broadcastStateTransitionFactory = require('../../../../../lib/methods/platform/broadcastStateTransition/broadcastStateTransitionFactory');
const BroadcastStateTransitionResponse = require('../../../../../lib/methods/platform/broadcastStateTransition/BroadcastStateTransitionResponse');

describe('broadcastStateTransitionFactory', () => {
  let grpcTransportMock;
  let broadcastStateTransition;
  let options;
  let stateTransitionFixture;
  let response;

  beforeEach(async function beforeEach() {
    response = new BroadcastStateTransitionResponse();

    grpcTransportMock = {
      request: this.sinon.stub().resolves(response),
    };

    const dataContractFixture = getDataContractFixture();
    const dpp = new HthPlatformProtocol();
    await dpp.initialize();

    stateTransitionFixture = dpp.dataContract.createDataContractCreateTransition(
      dataContractFixture,
    );

    options = {
      timeout: 1000,
    };

    broadcastStateTransition = broadcastStateTransitionFactory(grpcTransportMock);
  });

  it('should broadcast state transition', async () => {
    const result = await broadcastStateTransition(stateTransitionFixture, options);

    const request = new BroadcastStateTransitionRequest();
    request.setStateTransition(stateTransitionFixture);

    expect(grpcTransportMock.request).to.be.calledOnceWithExactly(
      PlatformPromiseClient,
      'broadcastStateTransition',
      request,
      options,
    );
    expect(result).to.be.an.instanceOf(BroadcastStateTransitionResponse);
  });
});
