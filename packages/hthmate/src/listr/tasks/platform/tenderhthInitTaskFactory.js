const { Listr } = require('listr2');

/**
 * @param {initializeTenderhthNode} initializeTenderhthNode
 * @param {Docker} docker
 * @return {tenderhthInitTask}
 */
function tenderhthInitTaskFactory(
  initializeTenderhthNode,
  docker,
) {
  /**
   * @typedef {tenderhthInitTask}
   * @param {Config} config
   * @return {Listr}
   */
  function tenderhthInitTask(
    config,
  ) {
    return new Listr([
      {
        title: 'Generate node keys and data',
        task: async (ctx, task) => {
          const isNodeKeyPresent = Object.keys(config.get('platform.drive.tenderhth.nodeKey')).length !== 0;
          const isGenesisPresent = Object.keys(config.get('platform.drive.tenderhth.genesis')).length !== 0;

          const { Volumes: existingVolumes } = await docker.listVolumes();
          const { COMPOSE_PROJECT_NAME: composeProjectName } = config.toEnvs();
          const isDataVolumePresent = existingVolumes.find((v) => v.Name === `${composeProjectName}_drive_tenderhth`);

          if (isNodeKeyPresent && isGenesisPresent && isDataVolumePresent) {
            task.skip('Node already initialized');

            return;
          }

          const [nodeKey, genesis, nodeId] = await initializeTenderhthNode(config);

          config.set('platform.drive.tenderhth.nodeId', nodeId);

          if (!isNodeKeyPresent) {
            config.set('platform.drive.tenderhth.nodeKey', nodeKey);
          }

          if (!isGenesisPresent) {
            config.set('platform.drive.tenderhth.genesis', genesis);
          }
        },
      },
    ]);
  }

  return tenderhthInitTask;
}

module.exports = tenderhthInitTaskFactory;
