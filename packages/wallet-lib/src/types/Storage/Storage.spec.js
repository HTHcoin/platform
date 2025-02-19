const { expect } = require('chai');

const localForage = require('localforage');
const Hthcore = require('@hthcoin/hthcore-lib');
const Storage = require('./Storage');
const { CONFIGURED } = require('../../EVENTS');

describe('Storage - constructor', function suite() {
  this.timeout(10000);
  it('It should create a storage', () => {
    const storage = new Storage();
    expect(storage.store).to.deep.equal({ wallets: {}, transactions: {}, transactionsMetadata: {}, chains: {}, instantLocks: {} });
    expect(storage.getStore()).to.deep.equal(storage.store);
    expect(storage.rehydrate).to.equal(true);
    expect(storage.autosave).to.equal(true);
    expect(storage.lastRehydrate).to.equal(null);
    expect(storage.lastSave).to.equal(null);
    expect(storage.lastModified).to.equal(null);
    storage.stopWorker();
  });
  it('should configure a storage with default adapter', async () => {
    const storage = new Storage();
    let configuredEvent = false;
    storage.on(CONFIGURED, () => configuredEvent = true);
    await storage.configure();
    expect(storage.adapter).to.exist;
    expect(storage.adapter.constructor.name).to.equal('InMem');
    expect(configuredEvent).to.equal(true);
    storage.stopWorker();
  });
  it('should handle bad adapter', async function () {
    if (process.browser){
      // Local forage is  valid adapter on browser.
      this.skip('LocalForage is a valid adapter on browser')
      return;
    }
    const expectedException1 = 'Invalid Storage Adapter : No available storage method found.';
    const storageOpts1 = { adapter: localForage };
    const storage = new Storage();
    return storage.configure(storageOpts1).then(
      () => Promise.reject(new Error('Expected method to reject.')),
      (err) => expect(err).to.be.a('Error').with.property('message', expectedException1),
    ).then(() => {
      storage.stopWorker();
    });
  });
  it('should work on usage', async () => {
    const storage = new Storage();
    await storage.configure();
    await storage.createChain(Hthcore.Networks.testnet);

    const defaultWalletId = 'squawk7700';
    const expectedStore1 = {
      wallets: {},
      transactions: {},
      transactionsMetadata:{},
      chains: {
        testnet: {
          name: 'testnet',
          blockHeight: -1,
          blockHeaders: {},
          mappedBlockHeaderHeights: {},
          fees: {
            minRelay: -1
          }
        },
      },
      instantLocks: {}
    };
    expect(storage.getStore()).to.deep.equal(expectedStore1);

    await storage.createWallet();
    const expectedStore2 = {
      wallets: {
        squawk7700: {
          accounts: {},
          network: Hthcore.Networks.testnet.toString(),
          mnemonic: null,
          type: null,
          identityIds: [],
          addresses: { external: {}, internal: {}, misc: {} },
        },
      },
      transactions: {},
      transactionsMetadata: {},
      chains: {
        testnet: {
          name: 'testnet',
          blockHeight: -1,
          blockHeaders: {},
          mappedBlockHeaderHeights: {},
          fees: {
            minRelay: -1
          }
        },
      },
      instantLocks: {},
    };
    expect(storage.getStore()).to.deep.equal(expectedStore2);
    expect(storage.store).to.deep.equal(expectedStore2);

    const account = {};
    await storage.importAccounts(account, defaultWalletId);
    storage.stopWorker();
  });
});
