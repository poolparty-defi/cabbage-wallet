import { SetStateAction, useAtom } from "jotai";
import { selectedWalletAtom } from "../atoms/walletAtoms";
import wallets, { Wallet } from "../wallets/wallets";

export const SELECTED_WALLET_KEY = "SELECTED_WALLET"

const useSelectedWallet = (): [Wallet | null, (update: SetStateAction<string>) => void] => {
    const [selectedWallet, setSelectedWallet] = useAtom(selectedWalletAtom)
    let wallet: Wallet | undefined | null

    if (selectedWallet) {
        wallet = wallets.find(w => w.name === selectedWallet)
        if (!wallet) {
            setSelectedWallet("")
            return [null, setSelectedWallet]
        }

        return [wallet, setSelectedWallet]
    }

    const stored = localStorage.getItem(SELECTED_WALLET_KEY)
    if (!stored) {
        setSelectedWallet("")
        return [null, setSelectedWallet]
    }

    wallet = wallets.find(w => w.name === stored)

    if (!wallet) {
        setSelectedWallet("")
        return [null, setSelectedWallet]
    }

    return [wallet, setSelectedWallet]
}

export default useSelectedWallet