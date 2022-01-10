const { WritableStream } = require('memory-streams');

/**
 *
 * @param {DockerCompose} dockerCompose
 * @param {Docker} docker
 * @param {dockerPull} dockerPull
 * @return {initializeTenderhthNode}
 */
function initializeTenderhthNodeFactory(dockerCompose, docker, dockerPull) {
  /**
   * @typedef {initializeTenderhthNode}
   * @param {Config} config
   * @return {Promise<Object>}
   */
  async function initializeTenderhthNode(config) {
    if (await dockerCompose.isServiceRunning(config.toEnvs(), 'drive_tenderhth')) {
      throw new Error('Can\'t initialize Tenderhth. Already running.');
    }

    const { COMPOSE_PROJECT_NAME: composeProjectName } = config.toEnvs();
    const volumeName = 'drive_tenderhth';
    const volumeNameFullName = `${composeProjectName}_${volumeName}`;

    const volume = docker.getVolume(volumeNameFullName);

    const isVolumeDefined = await volume.inspect()
      .then(() => true)
      .catch(() => false);

    if (!isVolumeDefined) {
      // Create volume with tenderhth data
      await docker.createVolume({
        Name: volumeNameFullName,
        Labels: {
          'com.docker.compose.project': composeProjectName,
          'com.docker.compose.version': '1.27.4',
          'com.docker.compose.volume': volumeName,
        },
      });
    }

    // Initialize Tenderhth

    const tenderhthImage = config.get('platform.drive.tenderhth.docker.image', true);

    await dockerPull(tenderhthImage);

    const writableStream = new WritableStream();

    const command = [
      '/usr/bin/tenderhth init > /dev/null',
      'echo "["',
      'cat $TMHOME/config/node_key.json',
      'echo ","',
      'cat $TMHOME/config/genesis.json',
      'echo ",\\""',
      '/usr/bin/tenderhth show-node-id',
      'echo "\\""',
      'echo "]"',
      'rm -rf $TMHOME/config',
    ].join('&&');

    const [result] = await docker.run(
      tenderhthImage,
      [],
      writableStream,
      {
        Entrypoint: ['sh', '-c', command],
        HostConfig: {
          AutoRemove: true,
          Binds: [`${volumeNameFullName}:/tenderhth`],
        },
      },
    );

    if (result.StatusCode !== 0) {
      let message = writableStream.toString();

      if (result.StatusCode === 1 && message === '') {
        message = 'already initialized. Please reset node data';
      }

      throw new Error(`Can't initialize tenderhth: ${message}`);
    }

    let stringifiedJSON = writableStream.toString();
    stringifiedJSON = stringifiedJSON.replace(/\r\n/g, '');

    return JSON.parse(stringifiedJSON);
  }

  return initializeTenderhthNode;
}

module.exports = initializeTenderhthNodeFactory;
