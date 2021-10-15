import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ConnectorResponseCode, Wallet } from "../wallets/wallets";
export interface CabbageWalletConfig {
    walletConnectOpts?: IWalletConnectProviderOptions;
}
export declare type ConnectFn = (wallet?: Wallet) => Promise<void>;
export interface CabbageWallet {
    connected: boolean;
    responseCode?: ConnectorResponseCode;
    connect: ConnectFn;
    disconnect: () => void;
}
export declare const SELECTED_WALLET_KEY = "SELECTED_WALLET";
declare const useCabbageWallet: (config: CabbageWalletConfig) => CabbageWallet;
export default useCabbageWallet;
