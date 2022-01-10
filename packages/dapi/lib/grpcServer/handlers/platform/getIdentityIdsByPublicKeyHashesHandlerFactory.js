const {
  server: {
    error: {
      InvalidArgumentGrpcError,
    },
  },
} = require('@hthcoin/grpc-common');

const {
  v0: {
    GetIdentityIdsByPublicKeyHashesResponse,
  },
} = require('@hthcoin/dapi-grpc');

/**
 *
 * @param {DriveClient} driveClient
 * @return {getIdentityIdsByPublicKeyHashesHandler}
 */
function getIdentityIdsByPublicKeyHashesHandlerFactory(
  driveClient,
) {
  /**
   * @typedef getIdentityIdsByPublicKeyHashesHandler
   * @param {Object} call
   * @return {Promise<GetIdentityIdsByPublicKeyHashesResponse>}
   */
  async function getIdentityIdsByPublicKeyHashesHandler(call) {
    const { request } = call;

    const publicKeyHashes = request.getPublicKeyHashesList();

    if (publicKeyHashes.length === 0) {
      throw new InvalidArgumentGrpcError('No public key hashes were provided');
    }

    const prove = request.getProve();

    const identityIdsResponseBuffer = await driveClient
      .fetchIdentityIdsByPublicKeyHashes(
        publicKeyHashes.map(Buffer.from),
        prove,
      );

    return GetIdentityIdsByPublicKeyHashesResponse.deserializeBinary(identityIdsResponseBuffer);
  }

  return getIdentityIdsByPublicKeyHashesHandler;
}

module.exports = getIdentityIdsByPublicKeyHashesHandlerFactory;
