## Sign and verify messages

HTH SDK exports the Message constructor inside the Core namespace `new HTH.Core.Message`.   

You can refer to its documentation : https://github.com/MichaelHDesigns/hthcore-message/blob/master/README.md

```js
const pk = new HTH.Core.PrivateKey();
const message = new HTH.Core.Message('hello, world');
const signed = account.sign(message, pk);
const verify = message.verify(pk.toAddress().toString(), signed.toString());
```

See [code snippet](https://github.com/MichaelHDesigns/platform/blob/master/packages/js-hth-sdk/examples/node/sign-and-verify-messages.js).
