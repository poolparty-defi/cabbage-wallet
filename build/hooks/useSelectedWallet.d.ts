import { SetStateAction } from "jotai";
import { Wallet } from "../wallets/wallets";
export declare const SELECTED_WALLET_KEY = "SELECTED_WALLET";
declare const useSelectedWallet: () => [Wallet, (update: SetStateAction<string>) => void];
export default useSelectedWallet;
