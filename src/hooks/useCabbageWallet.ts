import { IWalletConnectProviderOptions } from "@walletconnect/types"
import { useAtom } from "jotai"
import { connectedAtom, responseCodeAtom, walletProviderAtom, selectedWalletAtom } from "../atoms/walletAtoms"
import wallets, { ConnectorResponseCode, Wallet } from "../wallets/wallets"

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

export const SELECTED_WALLET_KEY = "SELECTED_WALLET"

const getWalletFromStorage = (): Wallet | undefined => {
    const stored = localStorage.getItem(SELECTED_WALLET_KEY)
    if (stored) {
        return undefined
    }

    return wallets.find(wallet => wallet.name === stored)
}

const useCabbageWallet = (config: CabbageWalletConfig): CabbageWallet => {
    const [selectedWallet, setSelectedWallet] = useAtom(selectedWalletAtom)
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
            const selected = getWalletFromStorage() || selectedWallet

            // no wallet connection saved
            if (!selected) {
                return
            }


            const response = await selected.connector(config.walletConnectOpts)
            setResponseCode(response.responseCode)
            if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
                setWalletProvider(response.provider)
                setSelectedWallet(selected)
                setConnected(true)
                localStorage.setItem(SELECTED_WALLET_KEY, wallet.name)
            }
            return
        }

        const response = await wallet.connector(config.walletConnectOpts)
        setResponseCode(response.responseCode)
        if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
            setWalletProvider(response.provider)
            setConnected(true)
            setSelectedWallet(wallet)
            localStorage.setItem(SELECTED_WALLET_KEY, wallet.name)
        }
    }

    const disconnect = () => {
        localStorage.removeItem(SELECTED_WALLET_KEY)
        setConnected(false)
        setSelectedWallet(undefined)
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