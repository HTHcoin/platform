const {
  createContainer: createAwilixContainer,
  InjectionMode,
  asFunction,
  asValue,
  asClass,
} = require('awilix');

const Docker = require('dockerode');

const ensureHomeDirFactory = require('./ensureHomeDirFactory');
const ConfigFileJsonRepository = require('./config/configFile/ConfigFileJsonRepository');
const createSystemConfigsFactory = require('./config/systemConfigs/createSystemConfigsFactory');
const isSystemConfigFactory = require('./config/systemConfigs/isSystemConfigFactory');
const migrateConfigFile = require('./config/configFile/migrateConfigFile');
const systemConfigs = require('../configs/system');

const renderServiceTemplatesFactory = require('./templates/renderServiceTemplatesFactory');
const writeServiceConfigsFactory = require('./templates/writeServiceConfigsFactory');

const DockerCompose = require('./docker/DockerCompose');
const StartedContainers = require('./docker/StartedContainers');
const stopAllContainersFactory = require('./docker/stopAllContainersFactory');
const dockerPullFactory = require('./docker/dockerPullFactory');
const resolveDockerHostIpFactory = require('./docker/resolveDockerHostIpFactory');

const startCoreFactory = require('./core/startCoreFactory');
const createRpcClient = require('./core/createRpcClient');
const waitForCoreStart = require('./core/waitForCoreStart');
const waitForCoreSync = require('./core/waitForCoreSync');
const waitForMasternodesSync = require('./core/waitForMasternodesSync');
const waitForBlocks = require('./core/waitForBlocks');
const waitForConfirmations = require('./core/waitForConfirmations');
const generateBlsKeys = require('./core/generateBlsKeys');
const activateCoreSpork = require('./core/activateCoreSpork');
const waitForCorePeersConnected = require('./core/waitForCorePeersConnected');

const createNewAddress = require('./core/wallet/createNewAddress');
const generateBlocks = require('./core/wallet/generateBlocks');
const generateToAddress = require('./core/wallet/generateToAddress');
const importPrivateKey = require('./core/wallet/importPrivateKey');
const getAddressBalance = require('./core/wallet/getAddressBalance');
const sendToAddress = require('./core/wallet/sendToAddress');
const registerMasternode = require('./core/wallet/registerMasternode');
const waitForBalanceToConfirm = require('./core/wallet/waitForBalanceToConfirm');

const generateToAddressTaskFactory = require('./listr/tasks/wallet/generateToAddressTaskFactory');
const registerMasternodeTaskFactory = require('./listr/tasks/registerMasternodeTaskFactory');
const initTaskFactory = require('./listr/tasks/platform/initTaskFactory');
const featureFlagTaskFactory = require('./listr/tasks/platform/featureFlagTaskFactory');
const tenderhthInitTaskFactory = require('./listr/tasks/platform/tenderhthInitTaskFactory');
const startNodeTaskFactory = require('./listr/tasks/startNodeTaskFactory');

const createTenderhthRpcClient = require('./tenderhth/createTenderhthRpcClient');
const initializeTenderhthNodeFactory = require('./tenderhth/initializeTenderhthNodeFactory');
const setupLocalPresetTaskFactory = require('./listr/tasks/setup/setupLocalPresetTaskFactory');
const setupRegularPresetTaskFactory = require('./listr/tasks/setup/setupRegularPresetTaskFactory');
const outputStatusOverviewFactory = require('./status/outputStatusOverviewFactory');
const stopNodeTaskFactory = require('./listr/tasks/stopNodeTaskFactory');
const restartNodeTaskFactory = require('./listr/tasks/restartNodeTaskFactory');
const resetNodeTaskFactory = require('./listr/tasks/resetNodeTaskFactory');
const configureCoreTaskFactory = require('./listr/tasks/setup/local/configureCoreTaskFactory');
const configureTenderhthTaskFactory = require('./listr/tasks/setup/local/configureTenderhthTaskFactory');
const initializePlatformTaskFactory = require('./listr/tasks/setup/local/initializePlatformTaskFactory');
const waitForNodeToBeReadyTaskFactory = require('./listr/tasks/platform/waitForNodeToBeReadyTaskFactory');
const enableCoreQuorumsTaskFactory = require('./listr/tasks/setup/local/enableCoreQuorumsTaskFactory');
const startGroupNodesTaskFactory = require('./listr/tasks/startGroupNodesTaskFactory');
const buildServicesTaskFactory = require('./listr/tasks/buildServicesTaskFactory');

async function createDIContainer() {
  const container = createAwilixContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  /**
   * Config
   */
  container.register({
    ensureHomeDir: asFunction(ensureHomeDirFactory).singleton(),
    configFileRepository: asClass(ConfigFileJsonRepository).singleton(),
    systemConfigs: asValue(systemConfigs),
    createSystemConfigs: asFunction(createSystemConfigsFactory).singleton(),
    isSystemConfig: asFunction(isSystemConfigFactory).singleton(),
    migrateConfigFile: asValue(migrateConfigFile),
    // `configFile` and `config` are registering on command init
  });

  /**
   * Templates
   */
  container.register({
    renderServiceTemplates: asFunction(renderServiceTemplatesFactory).singleton(),
    writeServiceConfigs: asFunction(writeServiceConfigsFactory).singleton(),
  });

  /**
   * Docker
   */
  container.register({
    docker: asFunction(() => (
      new Docker()
    )).singleton(),
    dockerCompose: asClass(DockerCompose).singleton(),
    startedContainers: asFunction(() => (
      new StartedContainers()
    )).singleton(),
    stopAllContainers: asFunction(stopAllContainersFactory).singleton(),
    dockerPull: asFunction(dockerPullFactory).singleton(),
    resolveDockerHostIp: asFunction(resolveDockerHostIpFactory).singleton(),
  });

  /**
   * Core
   */
  container.register({
    createRpcClient: asValue(createRpcClient),
    waitForCoreStart: asValue(waitForCoreStart),
    waitForCoreSync: asValue(waitForCoreSync),
    waitForMasternodesSync: asValue(waitForMasternodesSync),
    startCore: asFunction(startCoreFactory).singleton(),
    waitForBlocks: asValue(waitForBlocks),
    waitForConfirmations: asValue(waitForConfirmations),
    generateBlsKeys: asValue(generateBlsKeys),
    activateCoreSpork: asValue(activateCoreSpork),
    waitForCorePeersConnected: asValue(waitForCorePeersConnected),
  });

  /**
   * Core Wallet
   */
  container.register({
    createNewAddress: asValue(createNewAddress),
    generateBlocks: asValue(generateBlocks),
    generateToAddress: asValue(generateToAddress),
    importPrivateKey: asValue(importPrivateKey),
    getAddressBalance: asValue(getAddressBalance),
    sendToAddress: asValue(sendToAddress),
    registerMasternode: asValue(registerMasternode),
    waitForBalanceToConfirm: asValue(waitForBalanceToConfirm),
  });

  /**
   * Tenderhth
   */
  container.register({
    createTenderhthRpcClient: asValue(createTenderhthRpcClient),
    initializeTenderhthNode: asFunction(initializeTenderhthNodeFactory).singleton(),
  });

  /**
   * Tasks
   */
  container.register({
    buildServicesTask: asFunction(buildServicesTaskFactory).singleton(),
    startGroupNodesTask: asFunction(startGroupNodesTaskFactory).singleton(),
    generateToAddressTask: asFunction(generateToAddressTaskFactory).singleton(),
    registerMasternodeTask: asFunction(registerMasternodeTaskFactory).singleton(),
    initTask: asFunction(initTaskFactory).singleton(),
    featureFlagTask: asFunction(featureFlagTaskFactory).singleton(),
    tenderhthInitTask: asFunction(tenderhthInitTaskFactory).singleton(),
    startNodeTask: asFunction(startNodeTaskFactory).singleton(),
    stopNodeTask: asFunction(stopNodeTaskFactory).singleton(),
    restartNodeTask: asFunction(restartNodeTaskFactory).singleton(),
    resetNodeTask: asFunction(resetNodeTaskFactory).singleton(),
    setupLocalPresetTask: asFunction(setupLocalPresetTaskFactory).singleton(),
    setupRegularPresetTask: asFunction(setupRegularPresetTaskFactory).singleton(),
    configureCoreTask: asFunction(configureCoreTaskFactory).singleton(),
    configureTenderhthTask: asFunction(configureTenderhthTaskFactory).singleton(),
    initializePlatformTask: asFunction(initializePlatformTaskFactory).singleton(),
    outputStatusOverview: asFunction(outputStatusOverviewFactory),
    waitForNodeToBeReadyTask: asFunction(waitForNodeToBeReadyTaskFactory).singleton(),
    enableCoreQuorumsTask: asFunction(enableCoreQuorumsTaskFactory).singleton(),
  });

  return container;
}

module.exports = createDIContainer;
