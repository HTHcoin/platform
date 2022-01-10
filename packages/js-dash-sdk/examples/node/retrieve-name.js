const HTH = require('hth');

const clientOpts = {
  network: 'testnet'
};
const client = new HTH.Client(clientOpts);

const platform = client.platform;

async function retrieveName(){
  const user = await platform.names.get('alice');
  console.dir({user}, {depth:5});
}
retrieveName();
