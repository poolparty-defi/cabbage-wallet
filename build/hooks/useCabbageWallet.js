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
    const [network, setNetwork] = jotai_1.useAtom(walletAtoms_1.networkAtom);
    const disconnect = () => {
        if (config.listeners) {
            walletProvider.removeAllListeners();
        }
        localStorage.removeItem(exports.SELECTED_WALLET_KEY);
        setConnected(false);
        setWalletProvider(undefined);
    };
    const connect = (wallet) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // wallet is already connected
                if (connected || walletProvider) {
                    resolve(wallets_1.ConnectorResponseCode.Success);
                    return;
                }
                // attempt to connect from stored wallet
                if (!wallet) {
                    const selected = getWalletFromStorage();
                    // no wallet connection saved
                    if (!selected) {
                        reject(wallets_1.ConnectorResponseCode.UnknownEror);
                        return;
                    }
                    try {
                        const response = yield selected.connector(config.walletConnectOpts);
                        if (response.responseCode == wallets_1.ConnectorResponseCode.Success && response.provider) {
                            const network = yield response.provider.getNetwork();
                            setNetwork(network.chainId);
                            setWalletProvider(response.provider);
                            setConnected(true);
                            if (config.listeners) {
                                config.listeners.forEach(event => {
                                    response.provider.on(event.eventName, event.listener);
                                });
                            }
                            resolve(response.responseCode);
                        }
                        else {
                            reject(response.responseCode);
                        }
                    }
                    catch (e) {
                        disconnect();
                        reject(e.responseCode);
                    }
                    return;
                }
                try {
                    const response = yield wallet.connector(config.walletConnectOpts);
                    if (response.responseCode == wallets_1.ConnectorResponseCode.Success && response.provider) {
                        const network = yield response.provider.getNetwork();
                        setNetwork(network.chainId);
                        setWalletProvider(response.provider);
                        setConnected(true);
                        localStorage.setItem(exports.SELECTED_WALLET_KEY, wallet.name);
                        if (config.listeners) {
                            config.listeners.forEach(event => {
                                response.provider.on(event.eventName, event.listener);
                            });
                        }
                        resolve(response.responseCode);
                    }
                    else {
                        reject(response.responseCode);
                    }
                }
                catch (e) {
                    disconnect();
                    reject(e.responseCode);
                }
            }
            catch (e) {
                disconnect();
                reject(wallets_1.ConnectorResponseCode.UnknownEror);
            }
        }));
    });
    return {
        connected,
        connect,
        disconnect
    };
};
exports.default = useCabbageWallet;
//# sourceMappingURL=useCabbageWallet.js.map