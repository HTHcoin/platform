const HthPlatformProtocol = require('../../lib/HthPlatformProtocol');
const protocolVersion = require('../../lib/version/protocolVersion');
const getChainAssetLockProofFixture = require('../../lib/test/fixtures/getChainAssetLockProofFixture');
const generateRandomIdentifier = require('../../lib/test/utils/generateRandomIdentifier');

describe('HthPlatformProtocol', () => {
  let dpp;

  beforeEach(async () => {
    dpp = new HthPlatformProtocol({});
    await dpp.initialize();
  });

  it('should propagate protocol version to factories', async () => {
    let dataContract = dpp.dataContract.create(generateRandomIdentifier(), {
      niceDocument: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
        required: ['$createdAt'],
        additionalProperties: false,
      },
    });
    const document = dpp.document.create(dataContract, generateRandomIdentifier(), 'niceDocument', {});
    let identity = dpp.identity.create(getChainAssetLockProofFixture(), []);

    expect(dataContract.protocolVersion).to.equal(protocolVersion.latestVersion);
    expect(document.protocolVersion).to.equal(protocolVersion.latestVersion);
    expect(identity.protocolVersion).to.equal(protocolVersion.latestVersion);

    dpp.setProtocolVersion(42);

    dataContract = dpp.dataContract.create(generateRandomIdentifier(), {
      niceDocument: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
        required: ['$createdAt'],
        additionalProperties: false,
      },
    });
    identity = dpp.identity.create(getChainAssetLockProofFixture(), []);

    expect(dataContract.protocolVersion).to.equal(42);
    expect(identity.protocolVersion).to.equal(42);
  });
});
