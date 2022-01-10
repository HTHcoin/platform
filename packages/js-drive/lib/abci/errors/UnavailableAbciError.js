const grpcErrorCodes = require('@hthcoin/grpc-common/lib/server/error/GrpcErrorCodes');

const AbstractAbciError = require('./AbstractAbciError');

class UnavailableAbciError extends AbstractAbciError {
  /**
   *
   * @param {string} message
   * @param {Object} [data]
   */
  constructor(message, data = {}) {
    super(grpcErrorCodes.UNAVAILABLE, message, data);
  }
}

module.exports = UnavailableAbciError;
