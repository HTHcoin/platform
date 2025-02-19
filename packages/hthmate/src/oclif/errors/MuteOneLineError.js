const { config } = require('@oclif/core');

const AbstractError = require('../../errors/AbstractError');

class MuteOneLineError extends AbstractError {
  /**
   * @param {Error} error
   */
  constructor(error) {
    super('SIGINT');

    if (config.debug || (error.message && error.message.trimEnd().includes('\n'))) {
      this.name = error.name;
      this.message = error.message;
      this.stack = error.stack;
    }

    this.error = error;
  }

  /**
   * Get thrown error
   * @return {Error}
   */
  getError() {
    return this.error;
  }
}

module.exports = MuteOneLineError;
