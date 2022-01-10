In order to use HTH SDK with TypeScript.    

Create an index.ts file  

```js
import HTH from 'hth';
const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: null, // Will generate a new address, you should keep it.
  },
};
const client = new HTH.Client(clientOpts);

client.isReady().then(()=> console.log('isReady'));
```

Have a following `tsconfig.json` file

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

**Compile:** `tsc -p tsconfig.json`  
**Run:** `node index.js`  
