const path = require('path');

const { loadPackageDefinition } = require('@hthcoin/grpc-common');

function getCoreDefinition(version) {
  const protoPath = path.join(__dirname, `../protos/core/v${version}/core.proto`);

  return loadPackageDefinition(protoPath, `org.hth.platform.dapi.v${version}.Core`);
}

module.exports = getCoreDefinition;
