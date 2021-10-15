import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ConnectorResponse } from "../wallets";
declare const connectWalletConnect: (walletConnectOpts: IWalletConnectProviderOptions) => Promise<ConnectorResponse>;
export default connectWalletConnect;
