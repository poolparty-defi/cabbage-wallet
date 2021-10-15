import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ethers } from "ethers";
import connectInjected from "./connectors/injected";
import connectWalletConnect from "./connectors/walletConnect";
const metamaskLogo = require("../assets/metamask_logo.svg") as string
const walletConnectLogo = require("../assets/wallet_connect_logo.svg") as string

declare global {
    interface Window {
        ethereum: any
    }
}

export enum ConnectorResponseCode {
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
    responseCode: ConnectorResponseCode,
    provider?: ethers.providers.Web3Provider
}

export interface Wallet {
    name: string,
    icon: string,
    desc: string,
    connector: (walletConnectOpts?: IWalletConnectProviderOptions) => Promise<ConnectorResponse>
}

const wallets: Array<Wallet> = [
    {
        name: "MetaMask",
        desc: "Connect to your MetaMask Wallet",
        icon: metamaskLogo,
        connector: connectInjected
    },
    {
        name: "WalletConnect",
        desc: "Scan with WalletConnect",
        icon: walletConnectLogo,
        connector: connectWalletConnect
    }
]

export default wallets