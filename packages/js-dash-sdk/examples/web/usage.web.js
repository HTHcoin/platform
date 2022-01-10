const network = "testnet";
const opts = {
  network,
  wallet: {
    mnemonic: "arena light cheap control apple buffalo indicate rare motor valid accident isolate",
  },
  apps: {
    hthcoin: {
    contractId: ''// Provide the hthcoin contract id here
    }
  }
};
const clientInstance = new HTH.Client(opts);

(async ()=>{
  const { platform } = clientInstance;
  account = await clientInstance.getWalletAccount();

  async function sendPayment() {
    const tx = await account.createTransaction({recipient: 'yNPbcFfabtNmmxKdGwhHomdYfVs6gikbPf', satoshis: 12000});
    console.log(await account.broadcastTransaction(tx));
  }

  async function readDocument() {
    const profile = await platform.documents.fetch('hthcoin.profile', {});
    console.log(profile);
  }
})()
