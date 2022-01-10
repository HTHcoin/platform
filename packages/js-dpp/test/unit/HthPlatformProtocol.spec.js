const { default: Ajv } = require('ajv/dist/2020');

const protocolVersion = require('../../lib/version/protocolVersion');

const HthPlatformProtocol = require('../../lib/HthPlatformProtocol');
const JsonSchemaValidator = require('../../lib/validation/JsonSchemaValidator');

const createStateRepositoryMock = require('../../lib/test/mocks/createStateRepositoryMock');

describe('HthPlatformProtocol', () => {
  let dpp;
  let stateRepositoryMock;
  let jsonSchemaValidatorMock;

  beforeEach(async function beforeEach() {
    stateRepositoryMock = createStateRepositoryMock(this.sinonSandbox);
    jsonSchemaValidatorMock = {};

    dpp = new HthPlatformProtocol({
      stateRepository: stateRepositoryMock,
      jsonSchemaValidator: jsonSchemaValidatorMock,
    });
    await dpp.initialize();
  });

  describe('constructor', () => {
    it('should create JsonSchemaValidator if not passed in options', async () => {
      dpp = new HthPlatformProtocol();
      await dpp.initialize();

      const jsonSchemaValidator = dpp.getJsonSchemaValidator();

      expect(jsonSchemaValidator).to.be.instanceOf(JsonSchemaValidator);
      expect(jsonSchemaValidator.ajv).to.be.instanceOf(Ajv);
    });

    it('should set default protocol version', () => {
      dpp = new HthPlatformProtocol();

      expect(dpp.protocolVersion).to.equal(protocolVersion.latestVersion);
    });
  });

  describe('getStateRepository', () => {
    it('should return StateRepository', () => {
      const result = dpp.getStateRepository();

      expect(result).to.equal(stateRepositoryMock);
    });
  });

  describe('getJsonSchemaValidator', () => {
    it('should return JsonSchemaValidator', () => {
      const result = dpp.getJsonSchemaValidator();

      expect(result).to.equal(jsonSchemaValidatorMock);
    });
  });

  describe('setProtocolVersion', () => {
    it('should set protocol version', () => {
      expect(dpp.protocolVersion).to.equal(protocolVersion.latestVersion);

      dpp.setProtocolVersion(42);

      expect(dpp.protocolVersion).to.equal(42);
    });
  });

  describe('getProtocolVersion', () => {
    it('should get protocol version', () => {
      expect(dpp.getProtocolVersion()).to.equal(protocolVersion.latestVersion);

      dpp.setProtocolVersion(42);

      expect(dpp.getProtocolVersion()).to.equal(42);
    });
  });
});
