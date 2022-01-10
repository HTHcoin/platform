const { startMongoDb, startHthCore } = require('@hthcoin/dp-services-ctl');

const createTestDIContainer = require('../../../lib/test/createTestDIContainer');

describe('waitReplicaSetInitializeFactory', function main() {
  this.timeout(90000);

  let mongoDB;
  let hthCore;
  let container;
  let waitReplicaSetInitialize;

  before(async () => {
    mongoDB = await startMongoDb();
    hthCore = await startHthCore();
  });

  after(async () => {
    await mongoDB.remove();
  });

  afterEach(async () => {
    if (container) {
      await container.dispose();
    }
  });

  it('should wait until mongodb replica set is initialed', async () => {
    container = await createTestDIContainer(mongoDB, hthCore);

    waitReplicaSetInitialize = container.resolve('waitReplicaSetInitialize');

    await waitReplicaSetInitialize(() => {});

    const status = await mongoDB.getClient().db('test')
      .admin()
      .command({ replSetGetStatus: 1 });

    const isInitialized = status && status.members && status.members[0] && status.members[0].stateStr === 'PRIMARY';
    expect(isInitialized).to.be.true();
  });
});
