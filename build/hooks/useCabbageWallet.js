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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTED_WALLET_KEY = void 0;
const jotai_1 = require("jotai");
const walletAtoms_1 = require("../atoms/walletAtoms");
const wallets_1 = __importStar(require("../wallets/wallets"));
exports.SELECTED_WALLET_KEY = "SELECTED_WALLET";
const getWalletFromStorage = () => {
    const stored = localStorage.getItem(exports.SELECTED_WALLET_KEY);
    if (!stored) {
        return undefined;
    }
    return wallets_1.default.find(wallet => wallet.name === stored);
};
const useCabbageWallet = (config) => {
    const [connected, setConnected] = jotai_1.useAtom(walletAtoms_1.connectedAtom);
    const [walletProvider, setWalletProvider] = jotai_1.useAtom(walletAtoms_1.walletProviderAtom);
    const [responseCode, setResponseCode] = jotai_1.useAtom(walletAtoms_1.responseCodeAtom);
    const disconnect = () => {
        localStorage.removeItem(exports.SELECTED_WALLET_KEY);
        setConnected(false);
        setWalletProvider(undefined);
    };
    const connect = (wallet) => __awaiter(void 0, void 0, void 0, function* () {
        // wallet is already connected
        if (connected || walletProvider) {
            return;
        }
        // attempt to connect from stored wallet
        if (!wallet) {
            const selected = getWalletFromStorage();
            // no wallet connection saved
            if (!selected) {
                return;
            }
            try {
                const response = yield selected.connector(config.walletConnectOpts);
                if (response.responseCode == wallets_1.ConnectorResponseCode.Success && response.provider) {
                    setWalletProvider(response.provider);
                    setConnected(true);
                    localStorage.setItem(exports.SELECTED_WALLET_KEY, wallet.name);
                    setResponseCode(response.responseCode);
                }
            }
            catch (e) {
                console.log("failed to reconnect:", e);
                setResponseCode(e.responseCode);
                disconnect();
            }
            return;
        }
        try {
            const response = yield wallet.connector(config.walletConnectOpts);
            setResponseCode(response.responseCode);
            if (response.responseCode == wallets_1.ConnectorResponseCode.Success && response.provider) {
                setWalletProvider(response.provider);
                setConnected(true);
                localStorage.setItem(exports.SELECTED_WALLET_KEY, wallet.name);
            }
        }
        catch (e) {
            setResponseCode(e.responseCode);
            disconnect();
        }
    });
    return {
        connected,
        responseCode,
        connect,
        disconnect
    };
};
exports.default = useCabbageWallet;
//# sourceMappingURL=useCabbageWallet.js.map