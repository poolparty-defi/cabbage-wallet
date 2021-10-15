/// <reference types="react" />
import { Wallet } from "../wallets/wallets";
declare const WalletSelection: (props: {
    connect: (wallet: Wallet) => Promise<void>;
}) => JSX.Element;
export default WalletSelection;
