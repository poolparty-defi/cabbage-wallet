import { ethers } from "ethers"
import { useAtom } from "jotai"
import { walletProviderAtom, connectedAtom } from "../atoms/walletAtoms"

export interface BalanceHook {
    getBalance: () => Promise<string>
}

const useBalance = (): BalanceHook => {
    const [provider] = useAtom(walletProviderAtom)
    const [connected] = useAtom(connectedAtom)

    const getBalance = async (): Promise<string> => new Promise<string>(async (resolve, reject) => {
        try {
            if (!connected || !provider) {
                reject()
                return
            }

            const signer = provider.getSigner()

            if (!signer) {
                reject()
                return
            }

            const address = await signer.getAddress()
            const balance = await provider.getBalance(address)
            let formattedBalance = ethers.utils.formatEther(balance)
            if (!formattedBalance) {
                formattedBalance = "0"
            }

            resolve(formattedBalance)
        } catch (e) {
            reject(e)
        }
    })

    return {
        getBalance
    }
}

export default useBalance