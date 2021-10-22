import { ethers, ContractInterface } from "ethers"
import { useAtom } from "jotai"
import { walletProviderAtom, connectedAtom } from "../atoms/walletAtoms"

export interface UseContractHook {
    getContract: (address: string, abi: ContractInterface) => ethers.Contract | null
}

const useContract = (): UseContractHook => {
    const [provider] = useAtom(walletProviderAtom)
    const [connected] = useAtom(connectedAtom)

    const getContract = (address: string, abi: ContractInterface): ethers.Contract | null => {
        if (!provider || !connected) {
            return null
        }

        return new ethers.Contract(address, abi, provider.getSigner())
    }

    return {
        getContract
    }
}

export default useContract