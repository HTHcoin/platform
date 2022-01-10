const { startMongoDb, startHthCore } = require('@hthcoin/dp-services-ctl');
const SimplifiedMNListStore = require('@hthcoin/hthcore-lib/lib/deterministicmnlist/SimplifiedMNListStore');

const createTestDIContainer = require('../../../lib/test/createTestDIContainer');

describe('updateSimplifiedMasternodeListFactory', function main() {
  this.timeout(190000);

  let mongoDB;
  let container;
  let hthCore;

  before(async () => {
    mongoDB = await startMongoDb();
  });

  after(async () => {
    await mongoDB.remove();
    if (hthCore) {
      await hthCore.remove();
    }
  });

  afterEach(async () => {
    if (container) {
      await container.dispose();
    }
  });

  it('should wait until SML will be retrieved', async () => {
    hthCore = await startHthCore();

    container = await createTestDIContainer(mongoDB, hthCore);

    const simplifiedMasternodeList = container.resolve('simplifiedMasternodeList');

    expect(simplifiedMasternodeList.getStore()).to.equal(undefined);

    const { result: randomAddress } = await hthCore.getApi().getNewAddress();

    await hthCore.getApi().generateToAddress(1000, randomAddress);

    const updateSimplifiedMasternodeList = container.resolve('updateSimplifiedMasternodeList');

    await updateSimplifiedMasternodeList(1000);

    expect(simplifiedMasternodeList.getStore())
      .to.be.an.instanceOf(SimplifiedMNListStore);
  });
});
