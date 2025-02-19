# [0.21.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.20.2...v0.21.0) (2021-10-25)


### Features

* update network parameters and migrations for `testnet-6` ([#457](https://github.com/MichaelHDesigns/hthmate/pull/457))
* add a script to configure test suite ([#410](https://github.com/MichaelHDesigns/hthmate/issues/410), [#447](https://github.com/MichaelHDesigns/hthmate/issues/447))


### Bug Fixes

* incorrect queue predictions returned by status command ([#416](https://github.com/MichaelHDesigns/hthmate/issues/416))
* drive log files were missing upon setup ([#428](https://github.com/MichaelHDesigns/hthmate/issues/428))
* error running status command on the seed node ([#424](https://github.com/MichaelHDesigns/hthmate/issues/424))
* migration to v0.20.0 fails ([#426](https://github.com/MichaelHDesigns/hthmate/issues/426))
* no such file or directory, drive_pretty_1.log ([#431](https://github.com/MichaelHDesigns/hthmate/issues/431))
* unavailable log settings on the seed node ([#427](https://github.com/MichaelHDesigns/hthmate/issues/427))
* `debug-logs` option doesn't apply to file logs ([#442](https://github.com/MichaelHDesigns/hthmate/issues/442))
* HTH JSON-RPC: Request Error: socket hang up ([#444](https://github.com/MichaelHDesigns/hthmate/issues/444))
* issues related to keeping log files in /tmp ([#437](https://github.com/MichaelHDesigns/hthmate/issues/437))
* various sentinel container errors on full nodes ([#443](https://github.com/MichaelHDesigns/hthmate/issues/443))
* core database contains a block from the future ([#448](https://github.com/MichaelHDesigns/hthmate/issues/448))



## [0.20.2](https://github.com/MichaelHDesigns/hthmate/compare/v0.20.1...v0.20.2) (2021-08-04)


### Features

* update network parameters and migrations for `testnet-5` ([#408](https://github.com/MichaelHDesigns/hthmate/pull/408))


### BREAKING CHANGES:

* cannot connect to networks prior to `testnet-5`



## [0.20.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.20.0...v0.20.1) (2021-07-28)


### Bug Fixes

* InvalidResponse error when connecting to older versions of dapi ([#406](https://github.com/MichaelHDesigns/hthmate/issues/406))



# [0.20.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.19.1...v0.20.0) (2021-07-22)


### Bug Fixes

* bad-txns-premature-spend-of-coinbase error ([#357](https://github.com/MichaelHDesigns/hthmate/issues/400))
* setup local command stuck in some envs ([#351](https://github.com/MichaelHDesigns/hthmate/issues/351), [#352](https://github.com/MichaelHDesigns/hthmate/issues/352), [#367](https://github.com/MichaelHDesigns/hthmate/issues/367), [#370](https://github.com/MichaelHDesigns/hthmate/issues/370))
* setup local command stuck with more than 3 nodes ([#390](https://github.com/MichaelHDesigns/hthmate/issues/390))
* missing llmq conf for devnets ([#400](https://github.com/MichaelHDesigns/hthmate/issues/400))
* windows tmp directory install error ([#393](https://github.com/MichaelHDesigns/hthmate/issues/393), thanks to @ICJR)
* set quorum type in tenderhth config ([a6ccf5c](https://github.com/MichaelHDesigns/hthmate/commit/a6ccf5cf84f4a3d28ea71192b6ad9287215a0538))
* failed wallet sync from time to time ([258691c](https://github.com/MichaelHDesigns/hthmate/commit/258691c1ca3bf1a294b375ee39d75fd91b7b3237))
* tenderhth local connectivity issues ([#363](https://github.com/MichaelHDesigns/hthmate/issues/363))


### Features

* wait nodes to be ready ([#369](https://github.com/MichaelHDesigns/hthmate/issues/369))
* add a temporary reset script for the local network ([#361](https://github.com/MichaelHDesigns/hthmate/issues/380), [#371](https://github.com/MichaelHDesigns/hthmate/issues/380), [#380](https://github.com/MichaelHDesigns/hthmate/issues/380))
* add an option to enable debug logs ([#349](https://github.com/MichaelHDesigns/hthmate/issues/349))
* enable debug logs option for setup local command ([#362](https://github.com/MichaelHDesigns/hthmate/issues/362))
* enable and request miner interval for setup local ([#360](https://github.com/MichaelHDesigns/hthmate/pull/360))
* configure tenderhth log level ([#364](https://github.com/MichaelHDesigns/hthmate/pull/364))
* migrate Drive state tree to blake3 ([#402](https://github.com/MichaelHDesigns/hthmate/issues/402))
* support minor Core updates ([#379](https://github.com/MichaelHDesigns/hthmate/issues/379))
* configure validator set LLMQ type ([#376](https://github.com/MichaelHDesigns/hthmate/issues/376))
* update DPP to 0.20.0 ([#381](https://github.com/MichaelHDesigns/hthmate/issues/381))
* update to Tenderhth v0.5.0  ([#358](https://github.com/MichaelHDesigns/hthmate/issues/358), [#395](https://github.com/MichaelHDesigns/hthmate/issues/395), [#399](https://github.com/MichaelHDesigns/hthmate/issues/399))
* efficient service build cache ([#389](https://github.com/MichaelHDesigns/hthmate/issues/389))


### BREAKING CHANGES:

* setup local command requests miner interval and debug logs
* Tenderhth v0.4.0 is not supported anymore
* building services from path required compose v2 installed and `DOCKER_COMPOSE_V2` env to be set
* platform services 0.19 and lower not supported



## [0.19.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.19.0...v0.19.1) (2021-05-18)


### Features

* update Core to 0.17.0.0-rc5 ([#353](https://github.com/MichaelHDesigns/hthmate/issues/353))



# [0.19.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.18.2...v0.19.0) (2021-05-12)


### Features

* node groups ([#253](https://github.com/MichaelHDesigns/hthmate/issues/253), [#337](https://github.com/MichaelHDesigns/hthmate/issues/337), [#343](https://github.com/MichaelHDesigns/hthmate/issues/343), [#338](https://github.com/MichaelHDesigns/hthmate/issues/338), [#321](https://github.com/MichaelHDesigns/hthmate/issues/321), [#313](https://github.com/MichaelHDesigns/hthmate/issues/313), [#309](https://github.com/MichaelHDesigns/hthmate/issues/309), [#314](https://github.com/MichaelHDesigns/hthmate/issues/314), [#311](https://github.com/MichaelHDesigns/hthmate/issues/311), [#307](https://github.com/MichaelHDesigns/hthmate/issues/307), [#300](https://github.com/MichaelHDesigns/hthmate/issues/300), [#298](https://github.com/MichaelHDesigns/hthmate/issues/298), [#296](https://github.com/MichaelHDesigns/hthmate/issues/296), [#291](https://github.com/MichaelHDesigns/hthmate/issues/291), [#292](https://github.com/MichaelHDesigns/hthmate/issues/292), [#282](https://github.com/MichaelHDesigns/hthmate/issues/282))
* rename mn-bootstrap to hthmate ([#324](https://github.com/MichaelHDesigns/hthmate/issues/324))
* ChainLock Asset Lock Proofs support ([#333](https://github.com/MichaelHDesigns/hthmate/issues/333))
* feature flags ([#329](https://github.com/MichaelHDesigns/hthmate/issues/329), [#336](https://github.com/MichaelHDesigns/hthmate/issues/336), [#350](https://github.com/MichaelHDesigns/hthmate/issues/329), [#334](https://github.com/MichaelHDesigns/hthmate/issues/334))
* update DAPI to 0.19 ([#330](https://github.com/MichaelHDesigns/hthmate/issues/330))
* display tasks elapsed time in verbose mode ([#320](https://github.com/MichaelHDesigns/hthmate/issues/320))
* NPM cache for DAPI and Drive builds ([#302](https://github.com/MichaelHDesigns/hthmate/issues/302))
* tenderhth empty blocks configuration ([#315](https://github.com/MichaelHDesigns/hthmate/issues/315))
* check docker version ([#310](https://github.com/MichaelHDesigns/hthmate/issues/310))
* skip Instant Lock verification in SDK ([#299](https://github.com/MichaelHDesigns/hthmate/issues/299))
* update drive to 0.19 ([#303](https://github.com/MichaelHDesigns/hthmate/issues/303))
* register masternodes on testnet given funding privkey ([#288](https://github.com/MichaelHDesigns/hthmate/issues/288))
* wait for node to be ready option ([#295](https://github.com/MichaelHDesigns/hthmate/issues/295))
* wait for tenderhth on start ([#289](https://github.com/MichaelHDesigns/hthmate/issues/289))
* activate sporks during local setup ([#286](https://github.com/MichaelHDesigns/hthmate/issues/286))


### Bug Fixes

* with docker compose 1.29 container.inspect throws error if the container isn't running ([#325](https://github.com/MichaelHDesigns/hthmate/issues/325))


### Documentation

* add update docs ([#345](https://github.com/MichaelHDesigns/hthmate/issues/345))


### BREAKING CHANGES

* the `setup local` command generates a local configs group
* the `local` config now is a template and should be used to start a node
* `mn` commands renamed to `hthmate`. Configs are now stored in `.hthmate` dir.



## [0.18.2](https://github.com/MichaelHDesigns/hthmate/compare/v0.18.1...v0.18.2) (2021-04-14)


### Features

* update to core 0.17.0.0-rc4 ([#326](https://github.com/MichaelHDesigns/hthmate/issues/326))



## [0.18.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.18.0...v0.18.1) (2021-03-09)


### Features

* update Drive and DAPI images ([0273d33](https://github.com/MichaelHDesigns/hthmate/commit/0273d33d524bd6dfa7facdd708fe79d4a2e83328))



# [0.18.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.17.4...v0.18.0) (2021-03-03)


### Bug Fixes

* platform sync shows Infinity% ([#281](https://github.com/MichaelHDesigns/hthmate/issues/281))
* status command returns TypeError ([#251](https://github.com/MichaelHDesigns/hthmate/issues/251))
* uncaught errors when remote services down ([#241](https://github.com/MichaelHDesigns/hthmate/issues/241))


### Features

* enable `llmq-qvved-sync` on testnet ([#267](https://github.com/MichaelHDesigns/hthmate/issues/267))
* include sentinel image version in config ([#265](https://github.com/MichaelHDesigns/hthmate/issues/265))
* update helpthehomelessd to `0.17.0.0-rc3-hotfix1` ([#276](https://github.com/MichaelHDesigns/hthmate/issues/276))
* hard and soft resets, `--platform-only` option ([#249](https://github.com/MichaelHDesigns/hthmate/issues/249), [#258](https://github.com/MichaelHDesigns/hthmate/issues/258), [#272](https://github.com/MichaelHDesigns/hthmate/issues/272))
* update Tenderhth to 0.34.3 ([#274](https://github.com/MichaelHDesigns/hthmate/issues/274))


### Chores

* remove evonet-specific code ([#268](https://github.com/MichaelHDesigns/hthmate/issues/274))



## [0.17.4](https://github.com/MichaelHDesigns/hthmate/compare/v0.17.3...v0.17.4) (2021-02-03)


### Features

* output Drive logs into files ([#252](https://github.com/MichaelHDesigns/hthmate/issues/252))



## [0.17.3](https://github.com/MichaelHDesigns/hthmate/compare/v0.17.2...v0.17.3) (2021-01-19)


### Bug Fixes

* HthCoin contract is not set for testnet ([#247](https://github.com/MichaelHDesigns/hthmate/issues/247))



## [0.17.2](https://github.com/MichaelHDesigns/hthmate/compare/v0.17.1...v0.17.2) (2021-01-13)


### Features

* add seed nodes for testnet ([#239](https://github.com/MichaelHDesigns/hthmate/issues/239))



## [0.17.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.17.0...v0.17.1) (2021-01-12)


### Bug Fixes

* validator state not found after reset ([#238](https://github.com/MichaelHDesigns/hthmate/issues/238))



# [0.17.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.16.1...v0.17.0) (2021-01-11)


### Features

* add verbose mode to commands ([#187](https://github.com/MichaelHDesigns/hthmate/issues/187), [#230](https://github.com/MichaelHDesigns/hthmate/issues/230))
* update dependencies [#177](https://github.com/MichaelHDesigns/hthmate/issues/177), [#188](https://github.com/MichaelHDesigns/hthmate/issues/188), [#211](https://github.com/MichaelHDesigns/hthmate/issues/211), ([#231](https://github.com/MichaelHDesigns/hthmate/issues/231))
* introduce setup command ([#200](https://github.com/MichaelHDesigns/hthmate/issues/200), [#214](https://github.com/MichaelHDesigns/hthmate/issues/214), [#219](https://github.com/MichaelHDesigns/hthmate/issues/219))
* configure `passFakeAssetLockProofForTests` ([#222](https://github.com/MichaelHDesigns/hthmate/issues/222))
* expose `rawchainlocksig` and `zmqpubrawtxlocksig` from Core ([#221](https://github.com/MichaelHDesigns/hthmate/issues/221))
* pass hthcoin contract id and block height to drive ([#220](https://github.com/MichaelHDesigns/hthmate/issues/220))
* add `skipAssetLockConfirmationValidation` option for drive ([#216](https://github.com/MichaelHDesigns/hthmate/issues/216))
* config migration ([#199](https://github.com/MichaelHDesigns/hthmate/issues/199))
* more status command output ([#124](https://github.com/MichaelHDesigns/hthmate/issues/124), [#229](https://github.com/MichaelHDesigns/hthmate/issues/229))
* update Insight API ([#206](https://github.com/MichaelHDesigns/hthmate/issues/206), [#207](https://github.com/MichaelHDesigns/hthmate/issues/207))
* register hthcoin contract ([#125](https://github.com/MichaelHDesigns/hthmate/issues/125))
* implement rate limiter in config ([#183](https://github.com/MichaelHDesigns/hthmate/issues/183))
* update envoy for multi-arch support ([#179](https://github.com/MichaelHDesigns/hthmate/issues/179))
* add network parameters to configs ([#150](https://github.com/MichaelHDesigns/hthmate/issues/150))
* add ZMQ envs for Drive ([#180](https://github.com/MichaelHDesigns/hthmate/issues/180))
* update testnet config ([#232](https://github.com/MichaelHDesigns/hthmate/issues/232))


### Bug Fixes

* pass correct params to error message ([#228](https://github.com/MichaelHDesigns/hthmate/issues/228))
* rmdir and tenderhth errors ([#227](https://github.com/MichaelHDesigns/hthmate/issues/227))
* configs are removed during writing ([#224](https://github.com/MichaelHDesigns/hthmate/issues/224))
* platform init doesn't work with many faulty nodes ([#217](https://github.com/MichaelHDesigns/hthmate/issues/217))
* syntax error in nginx config ([#205](https://github.com/MichaelHDesigns/hthmate/issues/205))
* templates dir not found in travis ([#201](https://github.com/MichaelHDesigns/hthmate/issues/201), [#203](https://github.com/MichaelHDesigns/hthmate/issues/203))
* a bunch of small fixes ([#194](https://github.com/MichaelHDesigns/hthmate/issues/194))
* lint errors and hth core config ([#192](https://github.com/MichaelHDesigns/hthmate/issues/192))
* add section to helpthehomelessd testnet config ([#175](https://github.com/MichaelHDesigns/hthmate/issues/175))



## [0.16.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.16.0...v0.16.1) (2020-10-30)


### Bug Fixes

* add section to helpthehomelessd testnet config ([#175](https://github.com/MichaelHDesigns/hthmate/issues/175))



# [0.16.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.15.1...v0.16.0) (2020-10-29)


### Bug Fixes

* "No available addresses" in setup command on the platform init step ([#164](https://github.com/MichaelHDesigns/hthmate/issues/164))


### Features

* make `NODE_ENV` and logging level configurable ([#172](https://github.com/MichaelHDesigns/hthmate/issues/172))
* obtain and pass DPNS contract block height ([#170](https://github.com/MichaelHDesigns/hthmate/issues/170), [#173](https://github.com/MichaelHDesigns/hthmate/issues/173))
* update to HTH SDK 0.16 ([#160](https://github.com/MichaelHDesigns/hthmate/issues/163), [#163](https://github.com/MichaelHDesigns/hthmate/issues/163), [#163](https://github.com/MichaelHDesigns/hthmate/issues/163), [#166](https://github.com/MichaelHDesigns/hthmate/issues/166))
* restart command ([#152](https://github.com/MichaelHDesigns/hthmate/issues/152))
* switch insight-api docker image to shumkov/insight-api:3.0.0 ([#157](https://github.com/MichaelHDesigns/hthmate/issues/157))
* update HTH Core to 0.16 ([#153](https://github.com/MichaelHDesigns/hthmate/issues/153), [#155](https://github.com/MichaelHDesigns/hthmate/issues/155))


### Documentation

* cannot mint hth on evonet ([#171](https://github.com/MichaelHDesigns/hthmate/issues/171))


### BREAKING CHANGES

* `platform.dpns.contractId` config options is moved to `platform.dpns.contract.id`
* data created with 0.15 version and less in not compatible. Please reset your node before upgrade
* see [Drive breaking changes](https://github.com/MichaelHDesigns/js-drive/releases/tag/v0.16.0)
* see [DAPI breaking changes](https://github.com/MichaelHDesigns/dapi/releases/tag/v0.16.0)



## [0.15.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.15.0...v0.15.1) (2020-09-08)


### Bug Fixes

* services.core.ports contains an invalid type ([#149](https://github.com/MichaelHDesigns/hthmate/issues/149))



# [0.15.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.14.0...v0.15.0) (2020-09-04)


### Bug Fixes

* ignored mint address option ([#143](https://github.com/MichaelHDesigns/hthmate/issues/143))
* HTH Client was created before Tendermint is started ([#131](https://github.com/MichaelHDesigns/hthmate/issues/131))
* gRPC buffer size settings in NGINX was too small ([#127](https://github.com/MichaelHDesigns/hthmate/issues/127))
* transaction filter stream doesn't work with gRPC-Web ([#116](https://github.com/MichaelHDesigns/hthmate/issues/116))


### Features

* replace env files and presets with new `config` command ([#119](https://github.com/MichaelHDesigns/hthmate/issues/119), [#138](https://github.com/MichaelHDesigns/hthmate/issues/138))
* remove unnecessary block generation ([#141](https://github.com/MichaelHDesigns/hthmate/issues/141))
* block mining with local development ([#137](https://github.com/MichaelHDesigns/hthmate/issues/137))
* move container datadirs to named docker volumes ([#123](https://github.com/MichaelHDesigns/hthmate/issues/123), [#139](https://github.com/MichaelHDesigns/hthmate/issues/139), [#140](https://github.com/MichaelHDesigns/hthmate/issues/140), [#142](https://github.com/MichaelHDesigns/hthmate/issues/142))
* nginx responds with unimplemented in case of unsupported version ([#134](https://github.com/MichaelHDesigns/hthmate/issues/134))
* move `subscribeToTransactionsWithProofs` to `Core` service ([#121](https://github.com/MichaelHDesigns/hthmate/issues/121))
* use new DPNS contract ([#117](https://github.com/MichaelHDesigns/hthmate/issues/117))
* generate empty blocks every 3 minutes ([#114](https://github.com/MichaelHDesigns/hthmate/issues/114))
* use `generateToAddress` instead of `generate` ([#111](https://github.com/MichaelHDesigns/hthmate/issues/111))
* add docker image update support to setup-for-local-development ([#113](https://github.com/MichaelHDesigns/hthmate/issues/113))


### Code Refactoring

* use MongoDB init script to initiate replica ([#147](https://github.com/MichaelHDesigns/hthmate/issues/147))
* remove getUTXO dependency for SDK ([#133](https://github.com/MichaelHDesigns/hthmate/issues/139))


### BREAKING CHANGES

* node data from `data` dir is not using anymore and should be removed
* see [Drive breaking changes](https://github.com/MichaelHDesigns/js-drive/releases/tag/v0.15.0)
* see [DAPI breaking changes](https://github.com/MichaelHDesigns/dapi/releases/tag/v0.15.0)



# [0.14.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.13.4...v0.14.0) (2020-07-24)


### Bug Fixes

* missing `build` section for `tx_filter_stream_service` service ([#94](https://github.com/MichaelHDesigns/hthmate/issues/94))
* missing env variables for `dapi-tx-filter-stream` service ([#99](https://github.com/MichaelHDesigns/hthmate/issues/99))
* faucet inputs where locked after platform initialization script ([#88](https://github.com/MichaelHDesigns/hthmate/issues/88))
* original Tendermint image creates wrong mount points ([#86](https://github.com/MichaelHDesigns/hthmate/issues/86))


### Features

* update Evonet preset to 0.14 ([#108](https://github.com/MichaelHDesigns/hthmate/issues/108), [#105](https://github.com/MichaelHDesigns/hthmate/issues/105))
* update Drive and DAPI versions to 0.14 ([#98](https://github.com/MichaelHDesigns/hthmate/issues/98))
* implement `status` command ([#49](https://github.com/MichaelHDesigns/hthmate/issues/49), [#93](https://github.com/MichaelHDesigns/hthmate/issues/93), [#96](https://github.com/MichaelHDesigns/hthmate/issues/96))
* move from Listr to Listr2 ([#84](https://github.com/MichaelHDesigns/hthmate/issues/84))
* implement `setup-for-local-development` command ([#82](https://github.com/MichaelHDesigns/hthmate/issues/82), [#101](https://github.com/MichaelHDesigns/hthmate/issues/101))
* implement `update` option for `start` command ([#80](https://github.com/MichaelHDesigns/hthmate/issues/80))
* build docker images from local directories ([#59](https://github.com/MichaelHDesigns/hthmate/issues/59), [#66](https://github.com/MichaelHDesigns/hthmate/issues/66), [#90](https://github.com/MichaelHDesigns/hthmate/issues/90))


### Documentation

* document `status` command in README ([#97](https://github.com/MichaelHDesigns/hthmate/issues/97))
* add release date badge ([#85](https://github.com/MichaelHDesigns/hthmate/issues/85))
* add development usage for local docker build ([#67](https://github.com/MichaelHDesigns/hthmate/issues/67))


### BREAKING CHANGES

* data created with previous versions of HTH Platform is incompatible we the new one, so you need to reset data before you start the node



## [0.13.4](https://github.com/MichaelHDesigns/hthmate/compare/v0.13.3...v0.13.4) (2020-06-18)


### Bug Fixes

* tendermint throw fatal error on start in linux environment ([#76](https://github.com/MichaelHDesigns/hthmate/issues/76))



## [0.13.3](https://github.com/MichaelHDesigns/hthmate/compare/v0.13.2...v0.13.3) (2020-06-18)


### Bug Fixes

* parsing docker container name on first start ([#75](https://github.com/MichaelHDesigns/hthmate/issues/75))



## [0.13.2](https://github.com/MichaelHDesigns/hthmate/compare/v0.13.1...v0.13.2) (2020-06-16)


### Bug Fixes

* DAPI rate limits disabled for evonet for some reason ([#73](https://github.com/MichaelHDesigns/hthmate/issues/73))



## [0.13.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.6...v0.13.1) (2020-06-12)


### Features

* update Evonet configs ([fd0158a](https://github.com/MichaelHDesigns/hthmate/commit/fd0158a45f1c624628fe7a2735124db1c9f20338))



# [0.13.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.6...v0.13.0) (2020-06-09)


### Bug Fixes

* do not start stopped services on the docker deamon restart ([#55](https://github.com/MichaelHDesigns/hthmate/issues/55))
* switch to hthcoin org for sentinel ([#62](https://github.com/MichaelHDesigns/hthmate/issues/62))


### Features

* start/stop node commands ([#45](https://github.com/MichaelHDesigns/hthmate/issues/45), [#48](https://github.com/MichaelHDesigns/hthmate/issues/48))
* data reset command ([#43](https://github.com/MichaelHDesigns/hthmate/issues/43), [#60](https://github.com/MichaelHDesigns/hthmate/issues/60))
* masternode registration commands ([#30](https://github.com/MichaelHDesigns/hthmate/issues/30), [#44](https://github.com/MichaelHDesigns/hthmate/issues/44), [#54](https://github.com/MichaelHDesigns/hthmate/issues/54), [#69](https://github.com/MichaelHDesigns/hthmate/issues/69))
* remove sleep from docker compose ([#57](https://github.com/MichaelHDesigns/hthmate/issues/57))
* allow to start full node ([#42](https://github.com/MichaelHDesigns/hthmate/issues/42))
* update configs and docker images ([#64](https://github.com/MichaelHDesigns/hthmate/issues/42))


### Documentation

* update README.md to clarify install instructions ([#33](https://github.com/MichaelHDesigns/hthmate/issues/33), [#65](https://github.com/MichaelHDesigns/hthmate/issues/65))


### BREAKING CHANGES

* HTH Platform v0.12 data in incompatible with 0.13, so you need to reset data before you start the node



# [0.12.6](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.5...v0.12.6) (2020-05-23)


### Features

* update Evonet configs ([#56](https://github.com/MichaelHDesigns/hthmate/issues/56))



# [0.12.5](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.4...v0.12.5) (2020-05-01)


### Bug Fixes

* use updated sentinel image ([#41](https://github.com/MichaelHDesigns/hthmate/issues/41))



# [0.12.4](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.3...v0.12.4) (2020-04-30)


### Bug Fixes

* MongoDB replica set doesn't work sometimes ([#40](https://github.com/MichaelHDesigns/hthmate/issues/40)) ([a5e31cd](https://github.com/MichaelHDesigns/hthmate/commit/a5e31cd341bfd3e18240e3ee4c8f5dfeebfd249c))



# [0.12.3](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.2...v0.12.3) (2020-04-28)


### Bug Fixes

* outdated genesis config for Tendermint ([#37](https://github.com/MichaelHDesigns/hthmate/issues/37))
* outdated persistent node IDs in Tendermint config ([#38](https://github.com/MichaelHDesigns/hthmate/issues/38))



## [0.12.2](https://github.com/MichaelHDesigns/hthmate/compare/v0.12.1...v0.12.2) (2020-04-22)


### Bug Fixes

* update DPNS identities for evonet ([#31](https://github.com/MichaelHDesigns/hthmate/issues/31))


## [0.12.1](https://github.com/MichaelHDesigns/hthmate/compare/v0.11.1...v0.12.0) (2020-04-21)


## Bug Fixes

* `latest` envoy docker image tag is not present anymore ([#29](https://github.com/MichaelHDesigns/hthmate/issues/29))


# [0.12.0](https://github.com/MichaelHDesigns/hthmate/compare/v0.11.1...v0.12.0) (2020-04-19)


### Bug Fixes

* hth-cli doesn't work without default config ([#18](https://github.com/MichaelHDesigns/hthmate/issues/18))
* explicitly load core conf file ([#23](https://github.com/MichaelHDesigns/hthmate/issues/23))
* invalid gRPC Web configuration ([#25](https://github.com/MichaelHDesigns/hthmate/issues/25), [#26](https://github.com/MichaelHDesigns/hthmate/issues/26))
* remove spork private key from сore config ([#11](https://github.com/MichaelHDesigns/hthmate/issues/11))


### Code Refactoring

* tidy up services and configs ([#27](https://github.com/MichaelHDesigns/hthmate/issues/27))


### Features

* add testnet preset ([#15](https://github.com/MichaelHDesigns/hthmate/issues/15))
* update to new Drive ([#21](https://github.com/MichaelHDesigns/hthmate/issues/21), [#24](https://github.com/MichaelHDesigns/hthmate/issues/24))


### BREAKING CHANGES

* data and config dir paths are changed
* `tendermint` service now called `drive_tendermint`
* `machine` is removed due to merging Machine into Drive
* new version of Drive is incompatible with 0.11 so you need to wipe data before run 0.12:
  * drop `drive_mongodb` and `drive_leveldb` volumes
  * `docker-commpose --env-file=.env.<PRESET> run drive_tendermint unsafe_reset_all`


## 0.11.1 (2020-03-17)


### Bug Fixes

*  update configs for Evonet ([#7](https://github.com/MichaelHDesigns/hthmate/issues/7))


# 0.11.0 (2020-03-09)


### Features

* update configurations and docker-compose file for `local` and `evonet` envs ([230ea62](https://github.com/MichaelHDesigns/hthmate/commit/230ea62a856b986127eb3b8e52bf7a19a5169818))


### BREAKING CHANGES

* `testnet` and `mainnet` is not supported anymore
