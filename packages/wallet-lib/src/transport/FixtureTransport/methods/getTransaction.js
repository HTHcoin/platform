const { Transaction } = require('@hthcoin/hthcore-lib');
const fs = require('fs');

module.exports = async function getTransaction(transactionHash) {
  const txFile = JSON.parse(fs.readFileSync(`${__dirname}/../data/transactions/${transactionHash}.json`));
  return new Transaction(Buffer.from(txFile.transaction, 'hex'));
};
