const { expect } = require('chai');
const mockedStore = require('../../../../fixtures/sirentonight-fullstore-snapshot-1562711703');
const getTotalBalance = require('./getTotalBalance');
const getConfirmedBalance = require('./getConfirmedBalance');
const getUnconfirmedBalance = require('./getUnconfirmedBalance');
const calculateDuffBalance = require('../../Storage/methods/calculateDuffBalance');

let mockedWallet;
describe('Account - getTotalBalance', function suite() {
  this.timeout(10000);
  before(() => {
    const storageHDW = {
      store: mockedStore,
      calculateDuffBalance,
      getStore: () => mockedStore,
      mappedAddress: {},
    };
    const walletId = Object.keys(mockedStore.wallets)[0];
    mockedWallet = {
      walletId,
      index: 0,
      storage: storageHDW,
    };
  });
  it('should correctly get the balance', async () => {
    const balance = await getTotalBalance.call(mockedWallet);
    expect(balance).to.equal(184499999506);
  });
  it('should correctly get the balance confirmed only', async () => {
    const balance = await getConfirmedBalance.call(mockedWallet);
    expect(balance).to.equal(184499999506);
  });
  it('should correctly get the balance hth value instead of duff', async () => {
    const balanceTotalHth = await getTotalBalance.call(mockedWallet, false);
    const balanceUnconfHth = await getUnconfirmedBalance.call(mockedWallet, false);
    const balanceConfHth = await getConfirmedBalance.call(mockedWallet, false);

    expect(balanceTotalHth).to.equal(1844.99999506);
    expect(balanceUnconfHth).to.equal(0);
    expect(balanceConfHth).to.equal(1844.99999506);
  });
});
