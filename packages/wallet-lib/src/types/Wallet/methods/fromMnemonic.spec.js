const Hthcore = require('@hthcoin/hthcore-lib');
const { expect } = require('chai');
const fromMnemonic = require('./fromMnemonic');
const knifeFixture = require('../../../../fixtures/knifeeasily');
const { WALLET_TYPES } = require('../../../CONSTANTS');

describe('Wallet - fromMnemonic', function suite() {
  this.timeout(10000);
  it('should indicate missing data', () => {
    const mockOpts1 = {};
    const exceptedException1 = 'Expected a valid mnemonic (typeof String or Mnemonic)';
    expect(() => fromMnemonic.call(mockOpts1)).to.throw(exceptedException1);
  });
  it('should set wallet from mnemonic', () => {
    const self1 = {
      network: 'livenet',
    };
    fromMnemonic.call(self1, knifeFixture.mnemonic);
    expect(self1.walletType).to.equal(WALLET_TYPES.HDWALLET);
    expect(self1.mnemonic).to.equal(knifeFixture.mnemonic);
    expect(self1.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootPrivateKeyMainnet);
    expect(new Hthcore.HDPrivateKey(self1.HDPrivateKey)).to.equal(self1.HDPrivateKey);
    expect(self1.keyChain.type).to.equal('HDPrivateKey');
    expect(self1.keyChain.network.name).to.equal('livenet');
    expect(self1.keyChain.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootPrivateKeyMainnet);
    expect(self1.keyChain.keys).to.deep.equal({});


    const self2 = {};
    fromMnemonic.call(self2, knifeFixture.mnemonic);
    expect(self2.walletType).to.equal(WALLET_TYPES.HDWALLET);
    expect(self2.mnemonic).to.equal(knifeFixture.mnemonic);
    expect(self2.keyChain.network.name).to.equal('testnet');
    expect(self2.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootPrivateKeyTestnet);
    expect(new Hthcore.HDPrivateKey(self2.HDPrivateKey)).to.equal(self2.HDPrivateKey);
    expect(self2.keyChain.type).to.equal('HDPrivateKey');
    expect(self2.keyChain.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootPrivateKeyTestnet);
    expect(self2.keyChain.keys).to.deep.equal({});
  });
  it('should reject invalid mnemonic', () => {
    const invalidInputs = [
      { mnemonic: 'knife easily prosper input concert merge prepare autumn pen blood glance chair' },
      { mnemonic: false },
      { mnemonic: true },
      { mnemonic: 0 },
    ];

    return invalidInputs.forEach((invalidInput) => {
      const self = {};
      expect(() => fromMnemonic.call(self, invalidInput)).to.throw('Expected a valid mnemonic (typeof String or Mnemonic)');
    });
  });
});
describe('Wallet - fromMnemonic - with passphrase', function suite() {
  this.timeout(10000);
  it('should correctly works with passphrase', () => {
    const self1 = {
      network: 'livenet',
      passphrase: knifeFixture.passphrase,
    };
    fromMnemonic.call(self1, knifeFixture.mnemonic);
    expect(self1.walletType).to.equal(WALLET_TYPES.HDWALLET);
    expect(self1.mnemonic).to.equal(knifeFixture.mnemonic);
    expect(self1.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootEncryptedPrivateKeyMainnet);
    expect(new Hthcore.HDPrivateKey(self1.HDPrivateKey)).to.equal(self1.HDPrivateKey);
    expect(self1.keyChain.type).to.equal('HDPrivateKey');
    expect(self1.keyChain.network.name).to.equal('livenet');
    expect(self1.keyChain.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootEncryptedPrivateKeyMainnet);
    expect(self1.keyChain.keys).to.deep.equal({});

    const path1 = 'm/44\'/5\'/0\'/0/0';
    const pubKey1 = self1.keyChain.getKeyForPath(path1).publicKey.toAddress();
    expect(new Hthcore.Address(pubKey1).toString()).to.equal('Xq3zjky18WjwAHpLgGLasvX5g8TeLRKaxt');

    const self2 = {
      passphrase: knifeFixture.passphrase,
    };
    fromMnemonic.call(self2, knifeFixture.mnemonic);
    expect(self2.walletType).to.equal(WALLET_TYPES.HDWALLET);
    expect(self2.mnemonic).to.equal(knifeFixture.mnemonic);
    expect(self2.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootEncryptedPrivateKeyTestnet);
    expect(new Hthcore.HDPrivateKey(self2.HDPrivateKey)).to.equal(self2.HDPrivateKey);
    expect(self2.keyChain.type).to.equal('HDPrivateKey');
    expect(self2.keyChain.network.name).to.equal('testnet');
    expect(self2.keyChain.HDPrivateKey.toString()).to.equal(knifeFixture.HDRootEncryptedPrivateKeyTestnet);
    expect(self2.keyChain.keys).to.deep.equal({});

    const path2 = 'm/44\'/1\'/0\'/0/0';
    const pubKey2 = self2.keyChain.getKeyForPath(path2).publicKey.toAddress();
    expect(new Hthcore.Address(pubKey2, 'testnet').toString()).to.equal('yWYCH9XDRnpdNxh67jQJFkovToBVwWr8Ck');
  });
});
