import { IWalletConnectProviderOptions } from "@walletconnect/types"
import { useAtom } from "jotai"
import { connectedAtom, responseCodeAtom, walletProviderAtom } from "../atoms/walletAtoms"
import { ConnectorResponseCode, Wallet } from "../wallets/wallets"
import useSelectedWallet, { SELECTED_WALLET_KEY } from "./useSelectedWallet"

export interface CabbageWalletConfig {
    walletConnectOpts?: IWalletConnectProviderOptions
}

export type ConnectFn = (wallet?: Wallet) => Promise<void>

export interface CabbageWallet {
    connected: boolean,
    responseCode?: ConnectorResponseCode
    connect: ConnectFn
    disconnect: () => void
}

const useCabbageWallet = (config: CabbageWalletConfig): CabbageWallet => {
    const [selectedWallet, setSelectedWallet] = useSelectedWallet()
    const [connected, setConnected] = useAtom(connectedAtom)
    const [walletProvider, setWalletProvider] = useAtom(walletProviderAtom)
    const [responseCode, setResponseCode] = useAtom(responseCodeAtom)

    const connect = async (wallet?: Wallet) => {
        // wallet is already connected
        if (connected || walletProvider) {
            return
        }

        // attempt to connect from stored wallet
        if (!wallet) {
            // no wallet connection saved
            if (!selectedWallet) {
                return
            }


            const response = await selectedWallet.connector(config.walletConnectOpts)
            setResponseCode(response.responseCode)
            if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
                setWalletProvider(response.provider)
                setConnected(true)
            }
            return
        }

        const response = await wallet.connector(config.walletConnectOpts)
        setResponseCode(response.responseCode)
        if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
            setWalletProvider(response.provider)
            setConnected(true)
            setSelectedWallet(wallet.name)
            localStorage.setItem(SELECTED_WALLET_KEY, wallet.name)
        }
    }

    const disconnect = () => {
        localStorage.removeItem(SELECTED_WALLET_KEY)
        setConnected(false)
        setSelectedWallet("")
        setWalletProvider(undefined)
    }

    return {
        connected,
        responseCode,
        connect,
        disconnect
    }
}

export default useCabbageWallet