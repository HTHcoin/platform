const {
  server: {
    error: {
      InvalidArgumentGrpcError,
    },
  },
} = require('@hthcoin/grpc-common');
const RPCError = require('./RPCError');
const ArgumentsValidationError = require('../errors/ArgumentsValidationError');
const HthCoreRpcError = require('../errors/HthCoreRpcError');

function isOperationalError(error) {
  return (
    (error instanceof ArgumentsValidationError)
    || (error instanceof HthCoreRpcError)
    || (error instanceof InvalidArgumentGrpcError)
  );
}

/**
 * Decorates function with an error handler
 * @param {function} command
 * @param {Logger} log
 * @return {function(*=): Promise<T | never>}
 */
function errorHandlerDecorator(command, log) {
  return function callCommand(args) {
    return command(args)
      .catch((e) => {
        if (e instanceof RPCError) {
          throw e;
        } else if (isOperationalError(e)) {
          throw new RPCError(-32602, e.message, e.data);
        }
        // In case if this is not a user error, print it to log and return 'Internal Error' to user
        if (log && typeof log.error === 'function') {
          log.error(e);
        }
        throw new RPCError(-32603, 'Internal error');
      });
  };
}

module.exports = errorHandlerDecorator;
