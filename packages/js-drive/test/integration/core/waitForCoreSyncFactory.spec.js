const { startMongoDb, startHthCore } = require('@hthcoin/dp-services-ctl');

const createTestDIContainer = require('../../../lib/test/createTestDIContainer');

describe('waitForCoreSyncFactory', function main() {
  this.timeout(90000);

  let mongoDB;
  let firstHthCore;
  let secondHthCore;
  let thirdHthCore;
  let container;
  let waitForCoreSync;

  before(async () => {
    mongoDB = await startMongoDb();
  });

  after(async () => {
    await mongoDB.remove();
    if (firstHthCore) {
      await firstHthCore.remove();
    }

    if (secondHthCore) {
      await secondHthCore.remove();
    }

    if (thirdHthCore) {
      await thirdHthCore.remove();
    }
  });

  afterEach(async () => {
    if (container) {
      await container.dispose();
    }
  });

  it('should wait until HTH Core in regtest mode with peers is synced', async () => {
    firstHthCore = await startHthCore();
    const { result: randomAddress } = await firstHthCore.getApi().getNewAddress();
    await firstHthCore.getApi().generateToAddress(1000, randomAddress);

    secondHthCore = await startHthCore();
    await secondHthCore.connect(firstHthCore);

    container = await createTestDIContainer(mongoDB, secondHthCore);
    waitForCoreSync = container.resolve('waitForCoreSync');

    await waitForCoreSync(() => {});

    const secondApi = secondHthCore.getApi();

    const {
      result: {
        blocks: currentBlockHeight,
        headers: currentHeadersNumber,
      },
    } = await secondApi.getBlockchainInfo();

    expect(currentBlockHeight).to.equal(1000);
    expect(currentHeadersNumber).to.equal(1000);
  });
});
