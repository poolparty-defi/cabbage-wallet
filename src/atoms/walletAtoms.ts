import { ethers } from "ethers";
import { atom } from "jotai";

export const connectedAtom = atom<boolean>(false)
export const walletProviderAtom = atom<ethers.providers.Web3Provider>(undefined as ethers.providers.Web3Provider)
export const networkAtom = atom<number>(undefined as number)