const HTH = require('hth');

const clientOpts = {
  network: 'testnet'
};
const client = new HTH.Client(clientOpts);

const getIdentity = async function () {
  let platform = client.platform;
  await client.isReady();

  platform
      .identities
      .get('3GegupTgRfdN9JMS8R6QXF3B2VbZtiw63eyudh1oMJAk')
      .then((identity) => {
        console.log({identity});
      });

};
getIdentity();
