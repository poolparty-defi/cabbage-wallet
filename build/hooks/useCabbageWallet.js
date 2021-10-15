"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jotai_1 = require("jotai");
const walletAtoms_1 = require("../atoms/walletAtoms");
const wallets_1 = require("../wallets/wallets");
const useSelectedWallet_1 = __importStar(require("./useSelectedWallet"));
const useCabbageWallet = (config) => {
    const [selectedWallet, setSelectedWallet] = useSelectedWallet_1.default();
    const [connected, setConnected] = jotai_1.useAtom(walletAtoms_1.connectedAtom);
    const [walletProvider, setWalletProvider] = jotai_1.useAtom(walletAtoms_1.walletProviderAtom);
    const [responseCode, setResponseCode] = jotai_1.useAtom(walletAtoms_1.responseCodeAtom);
    const connect = async (wallet) => {
        // wallet is already connected
        if (connected || walletProvider) {
            return;
        }
        // attempt to connect from stored wallet
        if (!wallet) {
            // no wallet connection saved
            if (!selectedWallet) {
                return;
            }
            const response = await selectedWallet.connector(config.walletConnectOpts);
            setResponseCode(response.responseCode);
            if (response.responseCode == wallets_1.ConnectorResponseCode.Success && response.provider) {
                setWalletProvider(response.provider);
                setConnected(true);
            }
            return;
        }
        const response = await wallet.connector(config.walletConnectOpts);
        setResponseCode(response.responseCode);
        if (response.responseCode == wallets_1.ConnectorResponseCode.Success && response.provider) {
            setWalletProvider(response.provider);
            setConnected(true);
            setSelectedWallet(wallet.name);
            localStorage.setItem(useSelectedWallet_1.SELECTED_WALLET_KEY, wallet.name);
        }
    };
    const disconnect = () => {
        localStorage.removeItem(useSelectedWallet_1.SELECTED_WALLET_KEY);
        setConnected(false);
        setSelectedWallet("");
        setWalletProvider(undefined);
    };
    return {
        connected,
        responseCode,
        connect,
        disconnect
    };
};
exports.default = useCabbageWallet;
//# sourceMappingURL=useCabbageWallet.js.map