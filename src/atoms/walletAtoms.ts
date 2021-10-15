import { ethers } from "ethers";
import { atom } from "jotai";
import { ConnectorResponseCode } from "../wallets/wallets";

export const connectedAtom = atom<boolean>(false)
export const selectedWalletAtom = atom<string>("")
export const walletProviderAtom = atom<ethers.providers.Web3Provider>(undefined as ethers.providers.Web3Provider)
export const responseCodeAtom = atom<ConnectorResponseCode>(undefined as ConnectorResponseCode)