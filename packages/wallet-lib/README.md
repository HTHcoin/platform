# Wallet Library

[![NPM Version](https://img.shields.io/npm/v/@hthcoin/wallet-lib)](https://www.npmjs.com/package/@hthcoin/wallet-lib)
[![Build Status](https://github.com/MichaelHDesigns/wallet-lib/actions/workflows/test_and_release.yml/badge.svg)](https://github.com/MichaelHDesigns/wallet-lib/actions/workflows/test_and_release.yml)
[![Release Date](https://img.shields.io/github/release-date/hthcoin/wallet-lib)](https://github.com/MichaelHDesigns/wallet-lib/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

A pure and extensible JavaScript Wallet Library for HTH

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Documentation](#documentation)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)


## Background

[HTH](https://www.hth.org) is a powerful new peer-to-peer platform for the next generation of financial technology. The decentralized nature of the HTH network allows for highly resilient HTH infrastructure, and the developer community needs reliable, open-source tools to implement HTH apps and services.

## Install

### Node

In order to use this library, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed, just type in your terminal :

```sh
npm install @hthcoin/wallet-lib
```

### CDN Standalone

For browser usage, you can also directly rely on unpkg. Below, we also assume you use [localForage](https://github.com/localForage/localForage) as your persistence adapter.

```
<script src="https://unpkg.com/@hthcoin/wallet-lib"></script>
<script src="https://unpkg.com/localforage"></script>
const wallet = new Wallet({adapter: localforage});
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

Wallet will by default connects to DAPI and use either localforage (browser based device) or a InMem adapter.
Account will by default be on expected BIP44 path (...0/0).

### Transports:

Insight-Client has been removed from MVP and is not working since Wallet-lib v3.0.

- [DAPI-Client](https://github.com/MichaelHDesigns/platform/tree/master/packages/js-dapi-client)

### Adapters :

- [LocalForage](https://github.com/localForage/localForage)
- [ReactNative AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage)

## Documentation

You can see some [examples here](docs/usage/examples.md).

More extensive documentation is available at https://hthcoin.github.io/platform/Wallet-library/ along with additional [examples & snippets](https://hthcoin.github.io/platform/Wallet-library/usage/examples/).

## Maintainers

Wallet-Lib is maintained by the [HTH Core Developers](https://www.github.com/MichaelHDesigns).
We want to thank all members of the community that have submitted suggestions, issues and pull requests.

## Contributing

Feel free to dive in! [Open an issue](https://github.com/MichaelHDesigns/platform/issues/new/choose) or submit PRs.

## License

[MIT](LICENSE) &copy; HTH Core Group, Inc.
