import { ethers, ContractInterface } from "ethers";
export interface UseContractHook {
    getContract: (address: string, abi: ContractInterface) => ethers.Contract | null;
}
declare const useContract: () => UseContractHook;
export default useContract;
