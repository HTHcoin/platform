# Drive

[![Latest Release](https://img.shields.io/github/v/release/hthcoin/js-drive-abci)](https://github.com/MichaelHDesigns/js-drive-abci/releases/latest)
[![Build Status](https://github.com/MichaelHDesigns/js-drive/actions/workflows/test_and_release.yml/badge.svg)](https://github.com/MichaelHDesigns/js-drive/actions/workflows/test_and_release.yml)
[![Release Date](https://img.shields.io/github/release-date/hthcoin/js-drive-abci)](https://img.shields.io/github/release-date/hthcoin/js-drive-abci)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

Replicated state machine for HTH Platform

Drive is the storage component of HTH Platform, allowing developers to store and secure their application data through HTH's masternode network. Application data structures are defined by a data contract, which is stored on Drive and used to verify/validate updates to your application data.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Configuration](#configuration)
- [Tests](#tests)
- [Maintainer](#maintainer)
- [Contributing](#contributing)
- [License](#license)

## Install

1. [Install Node.JS 12 or higher](https://nodejs.org/en/download/)
2. Copy `.env.example` to `.env` file
3. Install npm dependencies: `npm install`

## Usage

```bash
npm run abci
```

## Configuration

Drive uses environment variables for configuration.
Variables are read from `.env` file and can be overwritten by variables
defined in env or directly passed to the process.

See all available settings in [.env.example](.env.example).

## Tests

[Read](test/) about tests in `test/` folder.

## Maintainer

[@shumkov](https://github.com/shumkov)

## Contributing

Feel free to dive in! [Open an issue](https://github.com/MichaelHDesigns/platform/issues/new/choose) or submit PRs.

## License

[MIT](LICENSE) &copy; HTH Core Group, Inc.
