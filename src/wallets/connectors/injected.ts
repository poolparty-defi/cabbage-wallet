import { ethers } from "ethers";
import { ConnectorResponse, ConnectorResponseCode } from "../wallets";

const connectInjected = async (): Promise<ConnectorResponse> => new Promise<ConnectorResponse>(async (resolve, reject) => {
    let response: ConnectorResponse
    try {
        if (typeof window.ethereum === "undefined") {
            response = {
                responseCode: ConnectorResponseCode.NoProvider
            }
            reject(response)
            return
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        try {
            await provider.send("eth_requestAccounts", [])
            response = {
                responseCode: ConnectorResponseCode.Success,
                provider
            }
            window.ethereum.on("chainChanged", () => window.location.reload())
            resolve(response)
        } catch (e: any) {
            response = {
                responseCode: e.code && e.code === -32002 ? ConnectorResponseCode.Pending : ConnectorResponseCode.UserRejected
            }
            reject(response)
        }
    } catch (e) {
        response = {
            responseCode: ConnectorResponseCode.UnknownEror
        }
        reject(response)
    }
})

export default connectInjected