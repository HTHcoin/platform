const { Listr } = require('listr2');

const HTH = require('hth');

const crypto = require('crypto');

const fundWallet = require('@hthcoin/wallet-lib/src/utils/fundWallet');

const dpnsDocumentSchema = require('@hthcoin/dpns-contract/schema/dpns-contract-documents.json');
const hthcoinDocumentSchema = require('@hthcoin/hthcoin-contract/schema/hthcoin.schema.json');
const featureFlagsDocumentSchema = require('@hthcoin/feature-flags-contract/schema/feature-flags-documents.json');
const masternodeRewardSharesSchema = require('@hthcoin/masternode-reward-shares-contract/schema/masternode-reward-shares-documents.json');

const { NETWORK_LOCAL } = require('../../../constants');

/**
 *
 * @return {initTask}
 */
function initTaskFactory(
  createTenderhthRpcClient,
) {
  /**
   * @typedef {initTask}
   * @param {Config} config
   * @return {Listr}
   */
  function initTask(
    config,
  ) {
    const dpnsOwnerId = config.get('platform.dpns.ownerId');

    if (dpnsOwnerId !== null) {
      throw new Error(`DPNS owner ID ('platform.dpns.ownerId') is already set in ${config.getName()} config`);
    }

    const dpnsContractId = config.get('platform.dpns.contract.id');

    if (dpnsContractId !== null) {
      throw new Error(`DPNS owner ID ('platform.dpns.contract.id') is already set in ${config.getName()} config`);
    }

    return new Listr([
      {
        title: 'Initialize SDK',
        task: async (ctx, task) => {
          const clientOpts = {
            network: config.get('network'),
            driveProtocolVersion: 1,
          };

          if (ctx.dapiAddress) {
            clientOpts.dapiAddresses = [ctx.dapiAddress];
          }

          const faucetClient = new HTH.Client({
            ...clientOpts,
            wallet: {
              privateKey: ctx.fundingPrivateKeyString,
            },
          });

          ctx.client = new HTH.Client({
            ...clientOpts,
            wallet: {
              mnemonic: null,
            },
          });

          const amount = 40000;

          await fundWallet(faucetClient.wallet, ctx.client.wallet, amount);

          await faucetClient.disconnect();

          // eslint-disable-next-line no-param-reassign
          task.output = `HD private key: ${ctx.client.wallet.exportWallet('HDPrivateKey')}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register DPNS identity',
        task: async (ctx, task) => {
          ctx.identity = await ctx.client.platform.identities.register(5);

          config.set('platform.dpns.ownerId', ctx.identity.getId().toString());

          // eslint-disable-next-line no-param-reassign
          task.output = `DPNS identity: ${ctx.identity.getId().toString()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register DPNS contract',
        task: async (ctx, task) => {
          ctx.dataContract = await ctx.client.platform.contracts.create(
            dpnsDocumentSchema, ctx.identity,
          );

          ctx.dataContractStateTransition = await ctx.client.platform.contracts.publish(
            ctx.dataContract,
            ctx.identity,
          );

          config.set('platform.dpns.contract.id', ctx.dataContract.getId().toString());

          // eslint-disable-next-line no-param-reassign
          task.output = `DPNS contract ID: ${ctx.dataContract.getId().toString()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Obtain DPNS contract commit block height',
        task: async (ctx, task) => {
          const stateTransitionHash = crypto.createHash('sha256')
            .update(ctx.dataContractStateTransition.toBuffer())
            .digest();

          if (ctx.dapiAddress || config.get('network') !== NETWORK_LOCAL) {
            task.skip('Can\'t obtain DPNS contract commit block height from remote node.'
              + `Please, get block height manually using state transition hash "0x${stateTransitionHash.toString('hex')}"`
              + 'and set it to "platform.dpns.contract.id" config option');

            return;
          }

          const tenderhthRpcClient = createTenderhthRpcClient();

          const params = { hash: stateTransitionHash.toString('base64') };

          const response = await tenderhthRpcClient.request('tx', params);

          if (response.error) {
            throw new Error(`Tenderhth error: ${response.error.message}: ${response.error.data}`);
          }

          const { result: { height: contractBlockHeight } } = response;

          config.set('platform.dpns.contract.blockHeight', contractBlockHeight);

          // eslint-disable-next-line no-param-reassign
          task.output = `DPNS contract block height: ${contractBlockHeight}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register top level domain "hth"',
        task: async (ctx) => {
          ctx.client.getApps().set('dpns', {
            contractId: ctx.dataContract.getId(),
            contract: ctx.dataContract,
          });

          await ctx.client.platform.names.register('hth', {
            thhAliasIdentityId: ctx.identity.getId(),
          }, ctx.identity);
        },
      },
      {
        title: 'Register identity for HthCoin',
        task: async (ctx, task) => {
          ctx.identity = await ctx.client.platform.identities.register(5);

          // eslint-disable-next-line no-param-reassign
          task.output = `HthCoin's owner identity: ${ctx.identity.getId()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register HthCoin Contract',
        task: async (ctx, task) => {
          ctx.dataContract = await ctx.client.platform.contracts.create(
            hthcoinDocumentSchema, ctx.identity,
          );

          ctx.hthcoinStateTransition = await ctx.client.platform.contracts.publish(
            ctx.dataContract,
            ctx.identity,
          );

          config.set('platform.hthcoin.contract.id', ctx.dataContract.getId().toString());

          // eslint-disable-next-line no-param-reassign
          task.output = `HthCoin contract ID: ${ctx.dataContract.getId()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Obtain HthCoin contract commit block height',
        task: async (ctx, task) => {
          const stateTransitionHash = crypto.createHash('sha256')
            .update(ctx.hthcoinStateTransition.toBuffer())
            .digest();

          if (ctx.dapiAddress || config.get('network') !== NETWORK_LOCAL) {
            task.skip('Can\'t obtain HthCoin contract commit block height from remote node.'
              + `Please, get block height manually using state transition hash "0x${stateTransitionHash.toString('hex')}"`
              + 'and set it to "platform.hthcoin.contract.id" config option');

            return;
          }

          const tenderhthRpcClient = createTenderhthRpcClient();

          const params = { hash: stateTransitionHash.toString('base64') };

          const response = await tenderhthRpcClient.request('tx', params);

          if (response.error) {
            throw new Error(`Tenderhth error: ${response.error.message}: ${response.error.data}`);
          }

          const { result: { height: contractBlockHeight } } = response;

          config.set('platform.hthcoin.contract.blockHeight', contractBlockHeight);

          // eslint-disable-next-line no-param-reassign
          task.output = `HthCoin contract block height: ${contractBlockHeight}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register Feature Flags identity',
        task: async (ctx, task) => {
          ctx.featureFlagsIdentity = await ctx.client.platform.identities.register(5000);

          config.set('platform.featureFlags.ownerId', ctx.featureFlagsIdentity.getId().toString());

          // eslint-disable-next-line no-param-reassign
          task.output = `Feature Flags identity: ${ctx.featureFlagsIdentity.getId().toString()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register Feature Flags contract',
        task: async (ctx, task) => {
          ctx.featureFlagsDataContract = await ctx.client.platform.contracts.create(
            featureFlagsDocumentSchema, ctx.featureFlagsIdentity,
          );

          ctx.client.getApps().set('featureFlags', {
            contractId: ctx.featureFlagsDataContract.getId(),
            contract: ctx.featureFlagsDataContract,
          });

          ctx.dataContractStateTransition = await ctx.client.platform.contracts.publish(
            ctx.featureFlagsDataContract,
            ctx.featureFlagsIdentity,
          );

          config.set('platform.featureFlags.contract.id', ctx.featureFlagsDataContract.getId().toString());

          // eslint-disable-next-line no-param-reassign
          task.output = `Feature Flags contract ID: ${ctx.featureFlagsDataContract.getId().toString()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Obtain Feature Flags contract commit block height',
        task: async (ctx, task) => {
          const stateTransitionHash = crypto.createHash('sha256')
            .update(ctx.dataContractStateTransition.toBuffer())
            .digest();

          if (ctx.dapiAddress || config.get('network') !== NETWORK_LOCAL) {
            task.skip('Can\'t obtain Feature Flags contract commit block height from remote node.'
              + `Please, get block height manually using state transition hash "0x${stateTransitionHash.toString('hex')}"`
              + 'and set it to "platform.featureFlags.contract.id" config option');

            return;
          }

          const tenderhthRpcClient = createTenderhthRpcClient();

          const params = { hash: stateTransitionHash.toString('base64') };

          const response = await tenderhthRpcClient.request('tx', params);

          if (response.error) {
            throw new Error(`Tenderhth error: ${response.error.message}: ${response.error.data}`);
          }

          const { result: { height: contractBlockHeight } } = response;

          config.set('platform.featureFlags.contract.blockHeight', contractBlockHeight);

          ctx.featureFlagsContractBlockHeight = contractBlockHeight;

          // eslint-disable-next-line no-param-reassign
          task.output = `Feature Flags contract block height: ${contractBlockHeight}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register Masternode Reward Shares identity',
        task: async (ctx, task) => {
          ctx.masternodeRewardSharesIdentity = await ctx.client.platform.identities.register(5000);

          // eslint-disable-next-line no-param-reassign
          task.output = `Reward Share identity: ${ctx.masternodeRewardSharesIdentity.getId().toString()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Register Masternode Reward Share contract',
        task: async (ctx, task) => {
          ctx.rewardSharingContract = await ctx.client.platform.contracts.create(
            masternodeRewardSharesSchema, ctx.masternodeRewardSharesIdentity,
          );

          ctx.client.getApps().set('masternodeRewardShares', {
            contractId: ctx.rewardSharingContract.getId(),
            contract: ctx.masternodeRewardSharesIdentity,
          });

          ctx.dataContractStateTransition = await ctx.client.platform.contracts.publish(
            ctx.rewardSharingContract,
            ctx.masternodeRewardSharesIdentity,
          );

          config.set('platform.masternodeRewardShares.contract.id', ctx.rewardSharingContract.getId().toString());

          // eslint-disable-next-line no-param-reassign
          task.output = `Reward Share contract ID: ${ctx.rewardSharingContract.getId().toString()}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Obtain Masternode Reward Share contract commit block height',
        task: async (ctx, task) => {
          const stateTransitionHash = crypto.createHash('sha256')
            .update(ctx.dataContractStateTransition.toBuffer())
            .digest();

          if (ctx.dapiAddress || config.get('network') !== NETWORK_LOCAL) {
            task.skip('Can\'t obtain Reward Share contract commit block height from remote node.'
              + `Please, get block height manually using state transition hash "0x${stateTransitionHash.toString('hex')}"`
              + 'and set it to "platform.masternodeRewardShares.contract.id" config option');

            return;
          }

          const tenderhthRpcClient = createTenderhthRpcClient();

          const params = { hash: stateTransitionHash.toString('base64') };

          const response = await tenderhthRpcClient.request('tx', params);

          if (response.error) {
            throw new Error(`Tenderhth error: ${response.error.message}: ${response.error.data}`);
          }

          const { result: { height: contractBlockHeight } } = response;

          config.set('platform.masternodeRewardShares.contract.blockHeight', contractBlockHeight);

          // eslint-disable-next-line no-param-reassign
          task.output = `Reward Share contract block height: ${contractBlockHeight}`;
        },
        options: { persistentOutput: true },
      },
      {
        title: 'Disconnect SDK',
        task: async (ctx) => ctx.client.disconnect(),
      },
    ]);
  }

  return initTask;
}

module.exports = initTaskFactory;
