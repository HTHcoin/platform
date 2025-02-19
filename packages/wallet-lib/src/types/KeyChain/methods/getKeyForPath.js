const { HDPrivateKey, PrivateKey } = require('@hthcoin/hthcore-lib');
/**
 * Get a key from the cache or generate if none
 * @param path
 * @param type - def : HDPrivateKey - Expected return datatype of the keys
 * @return {HDPrivateKey | HDPublicKey}
 */
function getKeyForPath(path, type = 'HDPrivateKey') {
  if (type === 'HDPublicKey') {
    // In this case, we do not generate or keep in cache.
    return this.generateKeyForPath(path, type);
  }

  if (this.type === 'HDPrivateKey') {
    if (!this.keys[path]) {
      this.keys[path] = this.generateKeyForPath(path, type).toString();
    }
    return new HDPrivateKey(this.keys[path]);
  }
  if (this.type === 'privateKey') {
    if (!this.keys[path]) {
      this.keys[path] = this.getPrivateKey(path).toString();
      return new PrivateKey(this.keys[path]);
    }
    return new PrivateKey(this.keys[path]);
  }
  return new HDPrivateKey(this.keys[path]);
}
module.exports = getKeyForPath;
