## Publishing a new contract

Right now, Evonet does not support publishing a public contract. You will have to run a local instance or wait for updates to the [HTH Platform documentation](https://hthplatform.readme.io/docs) regarding how to run a devnet locally and publish a contract.

For now you can try your luck using the [HTH Network Deploy tool](https://github.com/MichaelHDesigns/hth-network-deploy) and refer to [how to use a local evonet](../examples/use-local-evonet.md).

## Create your contract

After having [registered an identity](https://hthplatform.readme.io/docs/tutorial-register-an-identity)
and [attached to a name](https://hthplatform.readme.io/docs/tutorial-register-a-name-for-an-identity) crafted your schema (you can see how on [about schemas](getting-started/about-schemas.md) and read the [DPNS schema](https://github.com/MichaelHDesigns/dpns-contract/blob/v0.2-dev/src/schema/dpns-documents.json) as an example), you then can perform the below actions :

```js
const schema = {};// You JSON schema defining the app.
const client = new HTH.Client({
  wallet: {
    mnemonic: '', // Your app mnemonic, which holds the identity
  },
});

// This is the name previously registered in DPNS.
const appName = 'MyApp';
client.isReady().then(registerContract);

async function getIdentity(idName) {
    const {identities, names} = client.platform;
    const identityId = (await names.get(idName)).data.records.hthIdentity;
    const identity = await identities.get(identityId);
    return identity
}
async function registerContract() {
    const {platform} = client;
    const identity = await getIdentity(appName);
    const contract = platform.contracts.create(schema, identity)
    const contractId = await platform.contracts.publish(contract, identity);
}
```

## Fetch or publish documents on your app

```js
const schema = {};// You JSON schema defining the app.

// This is the name previously registered in DPNS.
const client = new HTH.Client({
  wallet: {
    mnemonic: "", // Your app mnemonic, which holds the identity
  },
  apps:{
    myapp:{
      contractId:""// The registered contract id
    }
  }
});

client.isReady().then(getDocuments);

async function getDocuments() {
    const {documents} = client.platform;
    const docs = await documents.fetch('myapp.myfield',{});
}

async function publishDocument(){
    const identity = await getIdentity(appName);
    const {documents} = client.platform;
    const doc = await documents.create('myapp.myfield',identity, {myproperties:'my value'});
    await documents.broadcast(doc, identity)
}
```
