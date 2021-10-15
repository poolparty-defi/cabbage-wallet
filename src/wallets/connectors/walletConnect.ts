import { IWalletConnectProviderOptions } from "@walletconnect/types";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { ConnectorResponse, ConnectorResponseCode } from "../wallets";

const connectWalletConnect = async (walletConnectOpts: IWalletConnectProviderOptions): Promise<ConnectorResponse> => new Promise<ConnectorResponse>(async (resolve, reject) => {
    let response: ConnectorResponse
    try {
        const walletConnectProvider = new WalletConnectProvider(walletConnectOpts)
        try {
            await walletConnectProvider.enable()
            const provider = new ethers.providers.Web3Provider(walletConnectProvider)
            response = {
                responseCode: ConnectorResponseCode.Success,
                provider
            }
            resolve(response)
        } catch (e) {
            console.log("walletConnectError:", e)
            response = {
                responseCode: ConnectorResponseCode.UnknownEror
            }
            reject(response)
        }
    } catch (e) {
        console.log("walletConnect failed:", e)
        response = {
            responseCode: ConnectorResponseCode.UnknownEror
        }
        reject(response)
    }
})

export default connectWalletConnect