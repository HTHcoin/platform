const path = require('path');

const {
  NETWORK_TESTNET,
  HOME_DIR_PATH,
} = require('../../src/constants');

module.exports = {
  description: 'base config for use as template',
  group: null,
  core: {
    docker: {
      image: 'hthcoin/helpthehomelessd:0.17',
    },
    p2p: {
      port: 20001,
      seeds: [],
    },
    rpc: {
      port: 20002,
      user: 'helpthehomelessrpc',
      password: 'rpcpassword',
    },
    spork: {
      address: null,
      privateKey: null,
    },
    masternode: {
      enable: true,
      operator: {
        privateKey: null,
      },
    },
    miner: {
      enable: false,
      interval: '2.5m',
      mediantime: null,
      address: null,
    },
    sentinel: {
      docker: {
        image: 'hthcoin/sentinel:1.6.0',
      },
    },
    debug: 0,
    devnetName: null,
  },
  platform: {
    dapi: {
      envoy: {
        docker: {
          image: 'envoyproxy/envoy:v1.16-latest',
        },
        http: {
          port: 3000,
        },
        grpc: {
          port: 3010,
        },
        rateLimiter: {
          maxTokens: 300,
          tokensPerFill: 150,
          fillInterval: '60s',
          enabled: true,
        },
      },
      api: {
        docker: {
          image: 'hthcoin/dapi:0.21',
        },
      },
    },
    drive: {
      mongodb: {
        docker: {
          image: 'mongo:4.2',
        },
      },
      abci: {
        docker: {
          image: 'hthcoin/drive:0.21',
        },
        log: {
          stdout: {
            level: 'info',
          },
          prettyFile: {
            level: 'silent',
            path: path.join(HOME_DIR_PATH, 'base', 'logs', 'drive-pretty.log'),
          },
          jsonFile: {
            level: 'silent',
            path: path.join(HOME_DIR_PATH, 'base', 'logs', 'drive-json.log'),
          },
        },
        validatorSet: {
          llmqType: 4,
        },
      },
      tenderhth: {
        docker: {
          image: 'hthcoin/tenderhth:0.7.0-dev.4',
        },
        p2p: {
          port: 26656,
          persistentPeers: [],
          seeds: [],
        },
        rpc: {
          port: 26657,
        },
        consensus: {
          createEmptyBlocks: true,
          createEmptyBlocksInterval: '3m',
        },
        log: {
          level: {
            main: 'info',
            state: 'info',
            statesync: 'info',
            '*': 'error',
          },
          format: 'plain',
        },
        nodeKey: {

        },
        genesis: {

        },
        nodeId: null,
      },
    },
    dpns: {
      contract: {
        id: null,
        blockHeight: null,
      },
      ownerId: null,
    },
    hthcoin: {
      contract: {
        id: null,
        blockHeight: null,
      },
    },
    featureFlags: {
      contract: {
        id: null,
        blockHeight: null,
      },
      ownerId: null,
    },
    sourcePath: null,
    masternodeRewardShares: {
      contract: {
        id: null,
        blockHeight: null,
      },
    },
  },
  externalIp: null,
  network: NETWORK_TESTNET,
  environment: 'production',
};
