# HTH SDK

[![NPM Version](https://img.shields.io/npm/v/hth)](https://www.npmjs.org/package/hth)
[![Build Status](https://github.com/MichaelHDesigns/js-hth-sdk/actions/workflows/test_and_release.yml/badge.svg)](https://github.com/MichaelHDesigns/js-hth-sdk/actions/workflows/test_and_release.yml)
[![Release Date](https://img.shields.io/github/release-date/hthcoin/js-hth-sdk)](https://github.com/MichaelHDesigns/js-hth-sdk/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

HTH library for JavaScript/TypeScript ecosystem (Wallet, DAPI, Primitives, BLS, ...)

HTH library allows you to connect to DAPI and receive or broadcast payments on the HTH Network, manage identifies, register data contracts, retrieve or submit documents on the HTH Platform, all within a single library.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Install

### ES5/ES6 via NPM

In order to use this library, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed, just type : `npm install hth` in your terminal.

```sh
npm install hth
```


### CDN Standalone

For browser usage, you can also directly rely on unpkg : 

```
<script src="https://unpkg.com/hth"></script>
```

## Usage

```js
const HTH = require("hth");

const client = new HTH.Client({
  network: "testnet",
  wallet: {
    mnemonic: "arena light cheap control apple buffalo indicate rare motor valid accident isolate",
  },
});

// Accessing an account allow you to transact with the HTH Network
client.getWalletAccount().then(async (account) => {
  console.log("Funding address", account.getUnusedAddress().address);

  const balance = account.getConfirmedBalance();
  console.log("Confirmed Balance", balance);

  if(balance > 0){
    // Creating an identity is the basis of all interactions with the HTH Platform
    const identity = await client.platform.identities.register()
    
    // Prepare a new document containing a simple hello world sent to a hypothetical tutorial contract
    const document = await platform.documents.create(
      'tutorialContract.note',
      identity,
      { message: 'Hello World' },
    );

    // Broadcast the document into a new state transition
    await platform.documents.broadcast({create:[document]}, identity);
  }
});
```

## Dependencies 

The HTH SDK works using multiple dependencies that might interest you:
- [Wallet-Lib](https://github.com/MichaelHDesigns/platform/tree/master/packages/wallet-lib) - Wallet management for handling, signing and broadcasting transactions (BIP-44 HD).
- [Hthcore-Lib](https://github.com/MichaelHDesigns/hthcore-lib) - Provides the main L1 blockchain primitives (Block, Transaction,...).
- [DAPI-Client](https://github.com/MichaelHDesigns/platform/tree/master/packages/js-dapi-client) - Client library for accessing DAPI endpoints.
- [DPP](https://github.com/MichaelHDesigns/platform/tree/master/packages/js-dpp) - Implementation (JS) of HTH Platform Protocol.

Some features might be more extensive in those libs, as HTH SDK only wraps around them to provide a single interface that is easy to use (and thus has less features).

## Documentation

More extensive documentation available at https://hthcoin.github.io/platform/SDK/.

## Contributing

Feel free to dive in! [Open an issue](https://github.com/MichaelHDesigns/platform/issues/new/choose) or submit PRs.

## License

[MIT](/LICENSE) © HTH Core Group, Inc.
