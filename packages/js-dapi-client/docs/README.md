## DAPI-Client

[![NPM Version](https://img.shields.io/npm/v/@hthcoin/dapi-client)](https://www.npmjs.com/package/@hthcoin/dapi-client)
[![Build Status](https://github.com/MichaelHDesigns/js-dapi-client/actions/workflows/test_and_release.yml/badge.svg)](https://github.com/MichaelHDesigns/js-dapi-client/actions/workflows/test_and_release.yml)
[![Release Date](https://img.shields.io/github/release-date/hthcoin/dapi-client)](https://github.com/MichaelHDesigns/dapi-client/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

Client library used to access HTH DAPI endpoints

This library enables HTTP-based interaction with the HTH blockchain and HTH
Platform via the decentralized API ([DAPI](https://github.com/MichaelHDesigns/dapi))
hosted on HTH masternodes.

 - `DAPI-Client` provides automatic server (masternode) discovery using either a default seed node or a user-supplied one
 - `DAPI-Client` maps to DAPI's [RPC](https://github.com/MichaelHDesigns/dapi/tree/master/lib/rpcServer/commands) and [gRPC](https://github.com/MichaelHDesigns/dapi/tree/master/lib/grpcServer/handlers) endpoints

### Install

### ES5/ES6 via NPM

In order to use this library in Node, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed, just type in your terminal :

```sh
npm install @hthcoin/dapi-client
```

### CDN Standalone

For browser usage, you can also directly rely on unpkg :

```
<script src="https://unpkg.com/@hthcoin/dapi-client"></script>
```


## Licence

[MIT](https://github.com/MichaelHDesigns/dapi-client/blob/master/LICENCE.md) © HTH Core Group, Inc.
