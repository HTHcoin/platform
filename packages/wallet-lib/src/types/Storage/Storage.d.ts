import {
    AddressObj,
    AddressType,
    Mnemonic,
    Network,
    TransactionInfo, TransactionMetaData, TransactionsWithMetaData,
    WalletObj, WalletType
} from "../types";
import { BlockHeader } from "@hthcoin/hthcore-lib";
import { Account } from "../..";
import { Transaction } from "@hthcoin/hthcore-lib/typings/transaction/Transaction";


export declare namespace Storage {
    interface IStorageOptions {
        rehydrate?: boolean;
        autosave?: boolean;
        autosaveIntervalTime?: number;
        network?: Network;
    }
    interface store {
        wallets: {},
        transactions: {},
        chains: {},
    }
}


export declare class Storage {
    constructor(options?: Storage.IStorageOptions);
    store: {};
    rehydrate: boolean;
    autosave: boolean;
    autosaveIntervalTime: number;
    lastRehydrate: number|null;
    lastSave: number|null;
    lastModified: number|null;
    network: Network;
    mappedAddress: MappedAddressMap;

    addNewTxToAddress(tx: TransactionInfo, address: string): boolean;
    announce(type: string, el: any): boolean;
    calculateDuffBalance(walletId: number, accountId: number, type: string): number;
    clearAll(): Promise<boolean>;
    configure(opts: {
        rehydrate?: boolean,
        autosave?: boolean,
        adapter?: any
    }): Promise<void>;
    createChain(network: string): boolean;
    createWallet(walletId: string, network: Network, mnemonic?:Mnemonic, type?: WalletType ): boolean;
    getBlockHeader(identifier: string|number): BlockHeader;
    getIdentityIdByIndex(walletId: string, identityIndex: number): string|undefined;
    getIndexedIdentityIds(walletId: string): Array<string|undefined>;
    getStore(): Storage.store;
    getTransaction(txid: string): Transaction;
    getTransactionMetadata(txid: string): TransactionMetaData;
    importAccounts(accounts: Account|[Account], walletId: string): boolean;
    importAddress(address: AddressObj, walletId: string): boolean;
    importAddresses(addresses: [AddressObj], walletId: string): boolean;
    importBlockHeader(blockHeader: BlockHeader, height: number): void;
    importSingleAddress(singleAddress: AddressObj, walletId: string): boolean;
    importTransaction(transaction: Transaction, metadata?: TransactionMetaData): void;
    importTransactions(transactions: Transaction|[Transaction]|[TransactionsWithMetaData]): boolean;
    insertIdentityIdAtIndex(walletId: string, identityId: string, identityIndex: number): void;
    rehydrateState(): Promise<void>;
    saveState(): Promise<boolean>;
    searchAddress(address: string, forceLoop: boolean): AddressSearchResult;
    searchAddressesWithTx(txid: string): AddressesSearchResult;
    searchBlockHeader(identifier: string|number): BlockHeaderSearchResult;
    searchTransaction(hash: string): TransactionSearchResult;
    searchTransactionMetadata(hash: string): TransactionMetadataSearchResult;
    searchWallet(walletId: string): WalletSearchResult;
    startWorker(): void;
    stopWorker(): boolean;
    updateAddress(addressObj: AddressObj, walletId: string): boolean;
    updateTransaction(transaction: Transaction): boolean;
}

interface MappedAddressMap {
    [pathName: string]: MappedAddress
}

interface MappedAddress {
    [path: string]: {
        walletId: string,
        type: AddressType,
        path: string
    };
}

interface WalletSearchResult {
    walletId: number,
    found: boolean,
    result?: WalletObj
}

interface TransactionSearchResult {
    hash: number,
    found: boolean,
    result?: TransactionInfo
}
interface TransactionMetadataSearchResult {
    hash: number,
    found: boolean,
    result?: TransactionMetaData
}

interface AddressSearchResult {
    address: string,
    type: AddressType,
    found: boolean,
    path?: string,
    result: AddressObj,
    walletId: number
}
interface BlockHeaderSearchResult {
    found: boolean,
    result?: BlockHeader,
    identifier: number|string
}

interface AddressesSearchResult {
    txid: number,
    found: boolean,
    results: [AddressObj]
}
