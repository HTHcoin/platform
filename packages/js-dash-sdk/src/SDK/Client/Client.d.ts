import DAPIClient from "@hthcoin/dapi-client"

export declare namespace SDK {
    interface platformOpts {
        client: DAPIClient;
        apps: object;
        state: object;
    }
}
