import { EventType, Listener } from "@ethersproject/providers";
import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ConnectorResponseCode, Wallet } from "../wallets/wallets";
export interface EventListener {
    eventName: EventType;
    listener: Listener;
}
export interface CabbageWalletConfig {
    walletConnectOpts?: IWalletConnectProviderOptions;
    listeners?: Array<EventListener>;
}
export declare type ConnectFn = (wallet?: Wallet) => Promise<ConnectorResponseCode>;
export interface CabbageWallet {
    connected: boolean;
    connect: ConnectFn;
    disconnect: () => void;
}
export declare const SELECTED_WALLET_KEY = "SELECTED_WALLET";
declare const useCabbageWallet: (config: CabbageWalletConfig) => CabbageWallet;
export default useCabbageWallet;
