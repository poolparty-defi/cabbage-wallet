"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTED_WALLET_KEY = void 0;
const jotai_1 = require("jotai");
const walletAtoms_1 = require("../atoms/walletAtoms");
const wallets_1 = __importDefault(require("../wallets/wallets"));
exports.SELECTED_WALLET_KEY = "SELECTED_WALLET";
const useSelectedWallet = () => {
    const [selectedWallet, setSelectedWallet] = jotai_1.useAtom(walletAtoms_1.selectedWalletAtom);
    let wallet;
    if (selectedWallet) {
        wallet = wallets_1.default.find(w => w.name === selectedWallet);
        if (!wallet) {
            setSelectedWallet("");
            return [null, setSelectedWallet];
        }
        return [wallet, setSelectedWallet];
    }
    const stored = localStorage.getItem(exports.SELECTED_WALLET_KEY);
    if (!stored) {
        setSelectedWallet("");
        return [null, setSelectedWallet];
    }
    wallet = wallets_1.default.find(w => w.name === stored);
    if (!wallet) {
        setSelectedWallet("");
        return [null, setSelectedWallet];
    }
    return [wallet, setSelectedWallet];
};
exports.default = useSelectedWallet;
//# sourceMappingURL=useSelectedWallet.js.map