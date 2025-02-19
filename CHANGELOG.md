## [0.22.0-dev.5](https://github.com/MichaelHDesigns/platform/compare/v0.22.0-dev.4...v0.22.0-dev.5) (2022-01-07)


### ⚠ BREAKING CHANGES

* **dpp:** `$id` can't be used in secondary indices
* **dpp:** Indexed properties now require size constraints
* allow using non-unique Identity public keys (#168)
* **hthmate:** `platform.drive.abci.docker.build.path' and 'platform.dapi.api.docker.build.path' are removed in favor of `platform.sourcePath'

### Features

* allow adding non-unique indices for newly defined properties ([#83](https://github.com/MichaelHDesigns/platform/issues/83))
* allow using non-unique Identity public keys ([#168](https://github.com/MichaelHDesigns/platform/issues/168))
* **hthmate:** build DAPI and Drive from monorepo path ([#145](https://github.com/MichaelHDesigns/platform/issues/145))
* distribute hthmate with NPM ([#148](https://github.com/MichaelHDesigns/platform/issues/148))
* **dpp:** `$id` can't be used in secondary indices ([#178](https://github.com/MichaelHDesigns/platform/issues/178))
* **dpp:** size constraints for indexed properties ([#179](https://github.com/MichaelHDesigns/platform/issues/179))
* masternode reward shares contract ([#160](https://github.com/MichaelHDesigns/platform/issues/160))


### Bug Fixes

* downgrade hth-core image to v0.17 ([#171](https://github.com/MichaelHDesigns/platform/issues/171))


### Documentation

* minor Readme fixes ([#163](https://github.com/MichaelHDesigns/platform/issues/163))


### Miscellaneous Chores

* **drive:** send initial core chain locked height on init chain ([#180](https://github.com/MichaelHDesigns/platform/issues/180))
* update to use current @oclif/core ([#154](https://github.com/MichaelHDesigns/platform/issues/154))

## [0.22.0-dev.4](https://github.com/MichaelHDesigns/platform/compare/v0.22.0-dev.3...v0.22.0-dev.4) (2021-12-24)


### Bug Fixes

* **drive:** `ValidatorSetUpdate` doesn't contain `nodeAddress` ([#155](https://github.com/MichaelHDesigns/platform/issues/155))
* **drive:** missed JS ABCI yarn cache ([#156](https://github.com/MichaelHDesigns/platform/issues/156))

## [0.22.0-dev.3](https://github.com/MichaelHDesigns/platform/compare/v0.21.6...v0.22.0-dev.3) (2021-12-21)


### ⚠ BREAKING CHANGES

* add required `name` property to index definition (#74)
* add an ability to update data contract (#52)
* Identity public key now has two more fields, purpose and securityLevel, and keys without those fields won't be valid anymore

### Features

* add an ability to update data contract ([#52](https://github.com/MichaelHDesigns/platform/issues/52))
* add required `name` property to index definition ([#74](https://github.com/MichaelHDesigns/platform/issues/74))
* **hthmate:** json output for status commands ([#31](https://github.com/MichaelHDesigns/platform/issues/31))
* **dpp:** add `readOnly` flag to `IdentityPublicKey` ([#142](https://github.com/MichaelHDesigns/platform/issues/142))
* **drive:** network address in `ValidatorUpdate` ABCI ([#140](https://github.com/MichaelHDesigns/platform/issues/140))
* enable mainnet for hthmate ([#2](https://github.com/MichaelHDesigns/platform/issues/2))
* identity public key purpose and security levels ([#46](https://github.com/MichaelHDesigns/platform/issues/46))
* support Apple Silicone ([#143](https://github.com/MichaelHDesigns/platform/issues/143))
* **wallet-lib:** do not sync transactions if mnemonic is absent
* **wallet-lib:** dump wallet storage ([#8](https://github.com/MichaelHDesigns/platform/issues/8))


### Bug Fixes

* **hthmate:** `cannot read properties of undefined (reading 'dpns')` on reset ([#47](https://github.com/MichaelHDesigns/platform/issues/47))


### Documentation

* improved sidebar and usage in DAPI client ([#3](https://github.com/MichaelHDesigns/platform/issues/3))
* provide getTransactionHistory ([#5](https://github.com/MichaelHDesigns/platform/issues/5))


### Tests

* **wallet-lib:** enable skipped test after the fix for grpc-js lib ([#71](https://github.com/MichaelHDesigns/platform/issues/71))


### Miscellaneous Chores

* fix wrong version in a release PR title ([#82](https://github.com/MichaelHDesigns/platform/issues/82))
* missed merk darwin x64 pre-build binary ([#144](https://github.com/MichaelHDesigns/platform/issues/144))
* undefined "-w" argument in restart script ([#85](https://github.com/MichaelHDesigns/platform/issues/85))

### [0.21.6](https://github.com/MichaelHDesigns/platform/compare/v0.21.5...v0.21.6) (2021-12-13)


### Bug Fixes

* **hthmate:** RPC error on stopping node ([#61](https://github.com/MichaelHDesigns/platform/issues/61))
* **wallet-lib:** "Failure: Type not convertible to Uint8Array" ([#60](https://github.com/MichaelHDesigns/platform/issues/60))
* **wallet-lib:** eventemitter memory leak ([#56](https://github.com/MichaelHDesigns/platform/issues/56))
* **wallet-lib:** invalid deserialization of persistent storage ([#76](https://github.com/MichaelHDesigns/platform/issues/76))


### Documentation

* publish consolidated docs using mkdocs ([#42](https://github.com/MichaelHDesigns/platform/issues/42))


### Miscellaneous Chores

* changelogs generation script ([#62](https://github.com/MichaelHDesigns/platform/issues/62))
* enable yarn PnP to achieve zero installs ([#63](https://github.com/MichaelHDesigns/platform/issues/63))
* exit if some env variables are empty during setup ([#75](https://github.com/MichaelHDesigns/platform/issues/75))
* fix `test:drive` script ([#78](https://github.com/MichaelHDesigns/platform/issues/78))
* migrate from NPM to Yarn 3 ([#50](https://github.com/MichaelHDesigns/platform/issues/50))
* remove temporary reset script ([#64](https://github.com/MichaelHDesigns/platform/issues/64))
* update oclif and remove pnpify ([#73](https://github.com/MichaelHDesigns/platform/issues/73))


### Build System

* fix bash syntax issue in release script ([#79](https://github.com/MichaelHDesigns/platform/issues/79))
* release process automation ([#67](https://github.com/MichaelHDesigns/platform/issues/67))

## [0.21.5](https://github.com/MichaelHDesigns/platform/compare/v0.21.4...v0.21.5) (2021-11-25)


### Bug Fixes

* new instant lock is not compatible with HthCore 0.17 ([#57](https://github.com/MichaelHDesigns/platform/issues/57))
* **wallet-lib:** tx chaining mempool conflict errors ([#57](https://github.com/MichaelHDesigns/platform/issues/44))


### Continuous Integration
* use correct Dockerfile in test suite release ([#58](https://github.com/MichaelHDesigns/platform/issues/58))
* set correct docker tag outputs in release workflow ([#55](https://github.com/MichaelHDesigns/platform/issues/55))
* enable NPM login on for release workflow ([#54](https://github.com/MichaelHDesigns/platform/issues/54))


## [0.21.4](https://github.com/MichaelHDesigns/platform/compare/v0.21.0...v0.21.4) (2021-11-23)


### Bug Fixes

* **dapi-client:** expect 100 but got 122 in SML provider test ([#22](https://github.com/MichaelHDesigns/platform/issues/22))
* **dapi-client:** retry doesn’t work with 502 errors ([#35](https://github.com/MichaelHDesigns/platform/issues/35))
* **dapi:** Identifier expects Buffer ([#28](https://github.com/MichaelHDesigns/platform/issues/28))
* **hthmate:** ajv schema errors ([#14](https://github.com/MichaelHDesigns/platform/issues/14))
* **hthmate:** reset command doesn't work if setup failed ([#23](https://github.com/MichaelHDesigns/platform/issues/23))
* **hthmate:** cannot read properties error on group:reset ([#47](https://github.com/MichaelHDesigns/platform/issues/47))
* **hthmate:** json output for status commands ([#31](https://github.com/MichaelHDesigns/platform/issues/31))
* **hthmate:** enable mainnet for hthmate ([#2](https://github.com/MichaelHDesigns/platform/issues/2))
* **dpp:** rename generateEntropy to entropyGenerator ([#13](https://github.com/MichaelHDesigns/platform/issues/13))
* **sdk:** dpp hash function import ([#15](https://github.com/MichaelHDesigns/platform/issues/15))
* **sdk:** override ts-node target for unit tests ([#21](https://github.com/MichaelHDesigns/platform/issues/21))
* **sdk:** this is undefined during unit tests ([#18](https://github.com/MichaelHDesigns/platform/issues/18))


### Features

* **hthmate:** force option for `group:stop` command ([#36](https://github.com/MichaelHDesigns/platform/issues/36))
* **hthmate:** provide docker build logs for verbose mode ([#19](https://github.com/MichaelHDesigns/platform/issues/19))
* migrate to HthCore 0.18.0.0-beta1 ([#51](https://github.com/MichaelHDesigns/platform/issues/51))
* **wallet-lib:** dump wallet storage ([#8](https://github.com/MichaelHDesigns/platform/issues/8))
* **wallet-lib:** do not sync transactions if mnemonic is absent ([#7](https://github.com/MichaelHDesigns/platform/issues/7))


### Performance Improvements

* **test-suite:** speedup test suite up to 6 times ([#30](https://github.com/MichaelHDesigns/platform/issues/30))


### Build System
* build only necessary packages ([#27](https://github.com/MichaelHDesigns/platform/issues/27))
* run npm scripts in parallel ([#33](https://github.com/MichaelHDesigns/platform/issues/33))
* cache native npm modules during docker build ([#20](https://github.com/MichaelHDesigns/platform/issues/20))
* setup semantic pull requests ([#11](https://github.com/MichaelHDesigns/platform/issues/11))
* **sdk:** upgrade to webpack 5 ([#6](https://github.com/MichaelHDesigns/platform/issues/6))


### Continuous Integration
* simplify release workflow ([#48](https://github.com/MichaelHDesigns/platform/issues/48))
* show docker logs on failure ([#43](https://github.com/MichaelHDesigns/platform/issues/43))
* check mismatch dependencies ([#26](https://github.com/MichaelHDesigns/platform/issues/26))
* run package tests in parallel ([#25](https://github.com/MichaelHDesigns/platform/issues/25))


### Tests
* adjust timeouts ([#45](https://github.com/MichaelHDesigns/platform/issues/45))
* **test-suite:** skipSynchronizationBeforeHeight option with new wallet ([#34](https://github.com/MichaelHDesigns/platform/issues/34))
* **dpp:** fix invalid network floating error ([#32](https://github.com/MichaelHDesigns/platform/issues/32))
* **dpp:** grpc common bootstrap not working ([#16](https://github.com/MichaelHDesigns/platform/issues/16))


### Documentation
* markdown link fixes ([#49](https://github.com/MichaelHDesigns/platform/issues/49))
* add README.md for the whole platform as a project ([#38](https://github.com/MichaelHDesigns/platform/issues/38))
* add contributing.md ([#37](https://github.com/MichaelHDesigns/platform/issues/37))
* **sdk:** provide getTransactionHistory ([#5](https://github.com/MichaelHDesigns/platform/issues/5))
* improved sidebar and usage in DAPI client ([#3](https://github.com/MichaelHDesigns/platform/issues/3))


### Styles
* fix ES linter errors ([#24](https://github.com/MichaelHDesigns/platform/issues/24))


### BREAKING CHANGES

* supports only new HthCore InstantLock format https://github.com/hthcoin/dips/blob/master/dip-0022.md


# Previous versions

Before 0.21.x, packages were located in separate repositories and have own changelogs:

* [DAPI Client](https://github.com/MichaelHDesigns/js-dapi-client/blob/master/CHANGELOG.md)
* [DAPI gRPC](https://github.com/MichaelHDesigns/dapi-grpc/blob/master/CHANGELOG.md)
* [DAPI](https://github.com/MichaelHDesigns/dapi/blob/master/CHANGELOG.md)
* [Hthmate](https://github.com/MichaelHDesigns/hthmate/blob/master/CHANGELOG.md)
* [HthCoin contract](https://github.com/MichaelHDesigns/hthcoin-contract/blob/master/CHANGELOG.md)
* [Feature Flags Contract](https://github.com/MichaelHDesigns/feature-flags-contract/blob/master/CHANGELOG.md)
* [HTH SDK](https://github.com/MichaelHDesigns/js-hth-sdk/blob/master/CHANGELOG.md)
* [HTH Platform Protocol JS](https://github.com/MichaelHDesigns/js-dpp/blob/master/CHANGELOG.md)
* [Drive](https://github.com/MichaelHDesigns/js-drive/blob/master/CHANGELOG.md)
* [HTH Platform Test Suite](https://github.com/MichaelHDesigns/platform-test-suite/blob/master/CHANGELOG.md)
* [Wallet Library](https://github.com/MichaelHDesigns/wallet-lib/blob/master/CHANGELOG.md)
