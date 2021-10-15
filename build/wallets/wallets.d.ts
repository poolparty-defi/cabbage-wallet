import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ethers } from "ethers";
declare global {
    interface Window {
        ethereum: any;
    }
}
export declare enum ConnectorResponseCode {
    /**
     * A successful wallet connection was made
     */
    Success = 1,
    /**
     * The user rejected the wallet connection
     */
    UserRejected = 2,
    /**
     * No wallet provider was found
     */
    NoProvider = 3,
    /**
     * A connection request is already pending
     */
    Pending = 4,
    /**
     * An unkown error occurred
     */
    UnknownEror = 5
}
export interface ConnectorResponse {
    responseCode: ConnectorResponseCode;
    provider?: ethers.providers.Web3Provider;
}
export interface Wallet {
    name: string;
    icon: string;
    desc: string;
    connector: (walletConnectOpts?: IWalletConnectProviderOptions) => Promise<ConnectorResponse>;
}
declare const wallets: Array<Wallet>;
export default wallets;
