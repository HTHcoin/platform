## Wallet-lib

[![NPM Version](https://img.shields.io/npm/v/@hthcoin/wallet-lib)](https://www.npmjs.com/package/@hthcoin/wallet-lib)
[![Build Status](https://github.com/MichaelHDesigns/wallet-lib/actions/workflows/test_and_release.yml/badge.svg)](https://github.com/MichaelHDesigns/wallet-lib/actions/workflows/test_and_release.yml)
[![Release Date](https://img.shields.io/github/release-date/hthcoin/wallet-lib)](https://github.com/MichaelHDesigns/wallet-lib/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

A pure and extensible JavaScript Wallet Library for HTH

### What it is 

Wallet-lib provides all the wallet features needed for node and browser usage.
From being able to display an account balance, to paying to another address, passing by the need to automate back-end task related to a cold-storage.  

Wallet-lib allows you to easily work with Wallets/Accounts for HDWallets, or from just a single private key.  
It also allows you to monitor public keys and HDPubKey.  
You might also wish to create your own set of plugins or your own coin selection logic.  

### Install

### ES5/ES6 via NPM

In order to use this library in Node, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed, just type in your terminal : 

```sh
npm install @hthcoin/wallet-lib
```

### CDN Standalone

For browser usage, you can also directly rely on unpkg :  

```
<script src="https://unpkg.com/@hthcoin/wallet-lib"></script>
```

## Usage

In your file, where you want to execute it :

```js
const { Wallet, EVENTS } = require('@hthcoin/wallet-lib');

const wallet = new Wallet();

// We can dump our initialization parameters
const mnemonic = wallet.exportWallet();

wallet.getAccount().then((account) => {
  // At this point, account has fetch all UTXOs if they exists
  const balance = account.getTotalBalance();
  console.log(`Balance: ${balance}`);

  // We easily can get a new address to fund
  const { address } = account.getUnusedAddress();
});
```

## Licence

[MIT](https://github.com/MichaelHDesigns/wallet-lib/blob/master/LICENCE.md) © HTH Core Group, Inc.

