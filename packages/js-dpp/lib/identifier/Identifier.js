const bs58 = require('bs58');

const IdentifierError = require('./errors/IdentifierError');

// Buffer extending is not a trivial thing:
// * https://github.com/nodejs/node/commit/651a5b51eb838e8e23a5b94ba34e8e06630a004a
// * https://github.com/nodejs/node/issues/4701
// * https://github.com/nodejs/help/issues/1300
// * https://github.com/nodejs/node/issues/2882

/**
 * @param {Buffer} buffer
 * @returns {Identifier}
 * @constructor
 */
function Identifier(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    throw new IdentifierError('Identifier expects Buffer');
  }

  if (buffer.length !== 32) {
    throw new IdentifierError('Identifier must be 32 long');
  }

  const patchedBuffer = Buffer.from(buffer);

  Object.setPrototypeOf(patchedBuffer, Identifier.prototype);

  // noinspection JSValidateTypes
  return patchedBuffer;
}

/**
 * Convert to Buffer
 *
 * @return {Buffer}
 */
Identifier.prototype.toBuffer = function toBuffer() {
  return Buffer.from(this);
};

/**
 * Encode to CBOR
 *
 * @param {Encoder} encoder
 * @return {boolean}
 */
Identifier.prototype.encodeCBOR = function encodeCBOR(encoder) {
  encoder.pushAny(this.toBuffer());

  return true;
};

/**
 * Convert to JSON
 *
 * @return {string}
 */
Identifier.prototype.toJSON = function toJSON() {
  return this.toString();
};

/**
 * Encode to string
 *
 * @param {string} [encoding=base58]
 * @return {string}
 */
Identifier.prototype.toString = function toString(encoding = 'base58') {
  if (encoding === 'base58') {
    return bs58.encode(this);
  }

  return this.toBuffer().toString(encoding);
};

/**
 * Create Identifier from buffer or encoded string
 *
 * @param {string|Buffer} value
 * @param {string} encoding
 * @return {Identifier}
 */
Identifier.from = function from(value, encoding = undefined) {
  let buffer;

  if (typeof value === 'string') {
    if (encoding === undefined) {
      // eslint-disable-next-line no-param-reassign
      encoding = 'base58';
    }

    if (encoding === 'base58') {
      buffer = bs58.decode(value);
    } else {
      buffer = Buffer.from(value, 'base64');
    }
  } else {
    if (encoding !== undefined) {
      throw new IdentifierError('encoding accepted only with type string');
    }

    buffer = value;
  }

  return new Identifier(buffer);
};

Object.setPrototypeOf(Identifier.prototype, Buffer.prototype);

Identifier.MEDIA_TYPE = 'application/x.hth.dpp.identifier';

module.exports = Identifier;
