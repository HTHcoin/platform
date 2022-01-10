const { Listr } = require('listr2');

/**
 * @param {tenderhthInitTask} tenderhthInitTask
 * @param {renderServiceTemplates} renderServiceTemplates
 * @param {writeServiceConfigs} writeServiceConfigs
 * @return {configureTenderhthTask}
 */
function configureTenderhthTaskFactory(
  tenderhthInitTask,
  renderServiceTemplates,
  writeServiceConfigs,
) {
  /**
   * @typedef {configureTenderhthTask}
   * @param {Config[]} configGroup
   * @return {Listr}
   */
  function configureTenderhthTask(configGroup) {
    return new Listr([
      {
        task: async (ctx) => {
          const platformConfigs = configGroup.filter((config) => config.has('platform'));

          const subTasks = platformConfigs.map((config) => ({
            title: `Initialize ${config.getName()} Tenderhth`,
            task: () => tenderhthInitTask(config),
          }));

          // Interconnect Tenderhth nodes
          subTasks.push({
            task: async () => {
              const randomChainIdPart = Math.floor(Math.random() * 60) + 1;
              const chainId = `helpthehomeless_masternode_local_${randomChainIdPart}`;

              const genesisTime = platformConfigs[0].get('platform.drive.tenderhth.genesis.genesis_time');

              platformConfigs.forEach((config, index) => {
                config.set('platform.drive.tenderhth.genesis.genesis_time', genesisTime);
                config.set('platform.drive.tenderhth.genesis.chain_id', chainId);
                config.set(
                  'platform.drive.tenderhth.genesis.initial_core_chain_locked_height',
                  ctx.initialCoreChainLockedHeight,
                );

                const p2pPeers = platformConfigs
                  .filter((_, i) => i !== index)
                  .map((innerConfig) => {
                    const nodeId = innerConfig.get('platform.drive.tenderhth.nodeId');
                    const port = innerConfig.get('platform.drive.tenderhth.p2p.port');

                    return {
                      id: nodeId,
                      host: config.get('externalIp'),
                      port,
                    };
                  });

                config.set('platform.drive.tenderhth.p2p.persistentPeers', p2pPeers);

                config.set(
                  'platform.drive.tenderhth.genesis.quorum_type',
                  config.get('platform.drive.abci.validatorSet.llmqType').toString(),
                );

                config.set('platform.drive.tenderhth.genesis.quorum_hash', null);

                const configFiles = renderServiceTemplates(config);
                writeServiceConfigs(config.getName(), configFiles);
              });
            },
          });

          return new Listr(subTasks);
        },
      },
    ]);
  }

  return configureTenderhthTask;
}

module.exports = configureTenderhthTaskFactory;
