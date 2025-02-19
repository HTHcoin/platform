const { isUnsignedInteger } = require('@hthcoin/hthcore-lib').util.js;

/**
 * @param host
 * @param parameterName
 * @returns {{isValid: boolean, validationError: null|string}}
 */
function validateHost(host, parameterName) {
  const validationResult = {
    isValid: typeof host === 'string' && host.length > 0,
    validationError: null,
  };
  if (!validationResult.isValid) {
    validationResult.validationError = `${parameterName} value is not valid. Valid host or ip address expected, found: ${host}`;
  }
  return validationResult;
}

/**
 * @param {number|string} port
 * @param {string} parameterName
 * @returns {{isValid: boolean, validationError: null|string}}
 */
function validatePort(port, parameterName) {
  const validationResult = {
    isValid: isUnsignedInteger(Number(port)) && Number(port) <= 65535,
    validationError: null,
  };
  if (!validationResult.isValid) {
    validationResult.validationError = `${parameterName} value is not valid. Valid port expected, found: ${port}`;
  }
  return validationResult;
}

/**
 * @param {Object} config
 * @returns {{isValid: boolean, validationErrors: (string|null)[]}}
 */
function validateConfig(config) {
  const validationResults = [];
  validationResults.push(validateHost(config.hthcore.p2p.host, 'HTHCORE_P2P_HOST'));
  validationResults.push(validatePort(config.hthcore.p2p.port, 'HTHCORE_P2P_PORT'));
  validationResults.push(validateHost(config.hthcore.rpc.host, 'HTHCORE_RPC_HOST'));
  validationResults.push(validatePort(config.hthcore.rpc.port, 'HTHCORE_RPC_PORT'));
  validationResults.push(validateHost(config.hthcore.zmq.host, 'HTHCORE_ZMQ_HOST'));
  validationResults.push(validatePort(config.hthcore.zmq.port, 'HTHCORE_ZMQ_PORT'));
  validationResults.push(validateHost(config.tendermintCore.host, 'TENDERMINT_RPC_HOST'));
  validationResults.push(validatePort(config.tendermintCore.port, 'TENDERMINT_RPC_PORT'));
  validationResults.push(validatePort(config.rpcServer.port.toString(), 'API_JSON_RPC_PORT'));
  validationResults.push(validatePort(config.grpcServer.port.toString(), 'API_GRPC_PORT'));
  validationResults.push(validatePort(config.txFilterStream.grpcServer.port.toString(), 'TX_FILTER_STREAM_GRPC_PORT'));

  const validationErrors = validationResults
    .filter((validationResult) => !validationResult.isValid)
    .map((validationResult) => validationResult.validationError);

  return {
    isValid: validationErrors.length < 1,
    validationErrors,
  };
}

module.exports = {
  validateHost,
  validatePort,
  validateConfig,
};
