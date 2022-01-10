<p align="center">
  <a href="https://hthplatform.readme.io/docs/introduction-what-is-hth-platform/">
    <img alt="babel" src="https://media.hth.org/wp-content/uploads/dash_digital-cash_logo_2018_rgb_for_screens.png" width="546">
  </a>
</p>

<p align="center">
  Seriously fast decentralized applications for the HTH network
</p>

<p align="center">
  <a href="https://github.com/MichaelHDesigns/platform/actions/workflows/all-packages.yml"><img alt="GitHub CI Status" src="https://github.com/MichaelHDesigns/platform/actions/workflows/all-packages.yml/badge.svg"></a>
  <a href="https://chat.dashdevs.org/"><img alt="Devs Chat" src="https://img.shields.io/badge/discord-Dev_chat-738adb"></a>
  <a href="https://discordapp.com/invite/PXbUxJB"><img alt="General Chat" src="https://img.shields.io/badge/discord-General_chat-738adb"></a>
  <a href="https://twitter.com/intent/follow?screen_name=HthCoin"><img alt="Follow on Twitter" src="https://img.shields.io/twitter/follow/HthCoin.svg?style=social&label=Follow"></a>
</p>

HTH Platform is a technology stack for building decentralized applications on
the HTH network. The two main architectural components, Drive and DAPI, turn
the HTH P2P network into a cloud that developers can integrate with their
applications.

If you are looking for how to contribute to the project or need any help with
building an app on the HTH Platform - message us on the [Devs
Discord](https://chat.dashdevs.org/)!

## Intro

This is a multi-package repository - sometimes also known as monorepository -
that contains all packages that comprise the HTH platform - for example, Drive,
which is the storage component of HTH Platform, the JavaScript SDK, wallet-lib,
DAPI, and others. Every individual package contains its own readme. Packages are
located in the [packages](./packages) directory.

## FAQ

### How to build and set up a node from the code in this repo?

- Clone the repo
- Install prerequisites:
  - [node.js](https://nodejs.org/) v16.10.0+
  - [docker](https://docs.docker.com/get-docker/) v20.10+
  - [docker-compose](https://docs.docker.com/compose/install/) v1.29.2+
- Run `corepack enable` to enable [corepack](https://nodejs.org/dist/latest/docs/api/corepack.html) and install yarn
- Run `yarn setup` to install dependencies and configure and build all packages
- Run `yarn start` to start the local dev environment built from the sources
- Run `yarn test` to run the whole test suite (note that running tests requires a running node, 
 so be sure to call `yarn start` first). Alternatively, you can run tests for a specific 
 package by running `yarn workspace <package_name> test`, for example running 
 `yarn workspace @hthcoin/dapi-client test` will run tests for the JS DAPI client. To see 
 all available packages, please see the [packages readme](./packages/README.md)
- `yarn stop` will stop the local dev environment. Running a dev environment requires a non-trivial amount of system resources,
 so it is best to stop the local node when not in use
- Run `yarn build` to rebuild the project after changes. If you have a local node
 running, you may need to restart it by running `yarn restart`
- To completely reset all local data and builds, run `yarn reset`

### Looking for support?

For questions and support, please join our [Devs
Discord](https://chat.dashdevs.org/)

### Where are the docs?

Our docs are hosted on
[readme.io](https://hthplatform.readme.io/docs/introduction-what-is-hth-platform).
You can create issues and feature requests in the
[issues](https://github.com/MichaelHDesigns/platform/issues) for this repository.

### Want to report a bug or request a feature?

Please read through our [CONTRIBUTING.md](CONTRIBUTING.md) and fill out the
issue template at [platform/issues](https://github.com/MichaelHDesigns/platform/issues)!

### Want to contribute to HTH Platform?

Check out:

- Our [Developers Discord](https://chat.dashdevs.org/)
- Our [CONTRIBUTING.md](CONTRIBUTING.md) to get started with setting up the
  repo.
- Our [news](https://www.hth.org/news/) and [blog](https://www.hth.org/blog/) which contains release posts and
  explanations.

## License

[MIT](LICENSE.md)
