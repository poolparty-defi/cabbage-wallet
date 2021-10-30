import {  EventType, Listener } from "@ethersproject/providers"
import { IWalletConnectProviderOptions } from "@walletconnect/types"
import { useAtom } from "jotai"
import { connectedAtom, walletProviderAtom, networkAtom } from "../atoms/walletAtoms"
import wallets, { ConnectorResponseCode, Wallet } from "../wallets/wallets"

export interface EventListener {
    eventName: EventType
    listener: Listener
}

export interface CabbageWalletConfig {
    walletConnectOpts?: IWalletConnectProviderOptions
    listeners?: Array<EventListener>
}

export type ConnectFn = (wallet?: Wallet) => Promise<ConnectorResponseCode>

export interface CabbageWallet {
    connected: boolean,
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
    const [network, setNetwork] = useAtom(networkAtom)

    const disconnect = () => {
        if (config.listeners) {
            walletProvider.removeAllListeners()
        }
        localStorage.removeItem(SELECTED_WALLET_KEY)
        setConnected(false)
        setWalletProvider(undefined)
    }

    const connect = async (wallet?: Wallet): Promise<ConnectorResponseCode> => new Promise<ConnectorResponseCode>(async (resolve, reject) => {
        try {
            // wallet is already connected
            if (connected || walletProvider) {
                resolve(ConnectorResponseCode.Success)
                return
            }

            // attempt to connect from stored wallet
            if (!wallet) {
                const selected = getWalletFromStorage()

                // no wallet connection saved
                if (!selected) {
                    reject(ConnectorResponseCode.UnknownEror)
                    return
                }

                try {
                    const response = await selected.connector(config.walletConnectOpts)
                    if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
                        const network = await response.provider.getNetwork()
                        setNetwork(network.chainId)
                        setWalletProvider(response.provider)
                        setConnected(true)
                        if (config.listeners) {
                            config.listeners.forEach(event => {
                                response.provider.on(event.eventName, event.listener)
                            })
                        }
                        resolve(response.responseCode)
                    }
                    else {
                        reject(response.responseCode)
                    }
                } catch (e: any) {
                    disconnect()
                    reject(e.responseCode)
                }
                return
            }

            try {
                const response = await wallet.connector(config.walletConnectOpts)
                if (response.responseCode == ConnectorResponseCode.Success && response.provider) {
                    const network = await response.provider.getNetwork()
                    setNetwork(network.chainId)
                    setWalletProvider(response.provider)
                    setConnected(true)
                    localStorage.setItem(SELECTED_WALLET_KEY, wallet.name)
                    if (config.listeners) {
                        config.listeners.forEach(event => {
                            response.provider.on(event.eventName, event.listener)
                        })
                    }
                    resolve(response.responseCode)
                }
                else {
                    reject(response.responseCode)
                }
            } catch (e: any) {
                disconnect()
                reject(e.responseCode)
            }
        } catch (e) {
            disconnect()
            reject(ConnectorResponseCode.UnknownEror)
        }
    })

    return {
        connected,
        connect,
        disconnect
    }
}

export default useCabbageWallet