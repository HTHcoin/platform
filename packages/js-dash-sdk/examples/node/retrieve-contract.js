const HTH = require('hth');

const clientOpts = {
  network: 'testnet'
};
const client = new HTH.Client(clientOpts);

const getContract = async function () {
  let platform = client.platform;
  await client.isReady();

  platform
      .contracts
      .get('77w8Xqn25HwJhjodrHW133aXhjuTsTv9ozQaYpSHACE3')
      .then((contract) => {
        console.dir({contract},{depth:5});
      });

};
getContract();
