import { IWalletConnectProviderOptions } from "@walletconnect/types"
import { useAtom } from "jotai"
import { connectedAtom, responseCodeAtom, walletProviderAtom } from "../atoms/walletAtoms"
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
    if (!stored) {
        return undefined
    }

    return wallets.find(wallet => wallet.name === stored)
}

const useCabbageWallet = (config: CabbageWalletConfig): CabbageWallet => {
    const [connected, setConnected] = useAtom(connectedAtom)
    const [walletProvider, setWalletProvider] = useAtom(walletProviderAtom)
    const [responseCode, setResponseCode] = useAtom(responseCodeAtom)

    const disconnect = () => {
        localStorage.removeItem(SELECTED_WALLET_KEY)
        setConnected(false)
        setWalletProvider(undefined)
    }


    const connect = async (wallet?: Wallet) => {
        // wallet is already connected
        if (connected || walletProvider) {
            return
        }

        // attempt to connect from stored wallet
        if (!wallet) {
            const selected = getWalletFromStorage()

            // no wallet connection saved
            if (!selected) {
                return
            }

            try {
                const response = await selected.connector(config.walletConnectOpts)
                if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
                    setWalletProvider(response.provider)
                    setConnected(true)
                    localStorage.setItem(SELECTED_WALLET_KEY, wallet.name)
                    setResponseCode(response.responseCode)
                }
            } catch (e: any) {
                setResponseCode(e.responseCode)
                disconnect()
            }
            return
        }

        try {
            const response = await wallet.connector(config.walletConnectOpts)
            setResponseCode(response.responseCode)
            if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
                setWalletProvider(response.provider)
                setConnected(true)
                localStorage.setItem(SELECTED_WALLET_KEY, wallet.name)
            }
        } catch (e: any) {
            setResponseCode(e.responseCode)
            disconnect()
        }
    }

    return {
        connected,
        responseCode,
        connect,
        disconnect
    }
}

export default useCabbageWallet