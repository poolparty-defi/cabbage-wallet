"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_provider_1 = __importDefault(require("@walletconnect/web3-provider"));
const ethers_1 = require("ethers");
const wallets_1 = require("../wallets");
const connectWalletConnect = (walletConnectOpts) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        try {
            const walletConnectProvider = new web3_provider_1.default(walletConnectOpts);
            try {
                yield walletConnectProvider.enable();
                const provider = new ethers_1.ethers.providers.Web3Provider(walletConnectProvider);
                response = {
                    responseCode: wallets_1.ConnectorResponseCode.Success,
                    provider
                };
                resolve(response);
            }
            catch (e) {
                console.log("walletConnectError:", e);
                response = {
                    responseCode: wallets_1.ConnectorResponseCode.UnknownEror
                };
                reject(response);
            }
        }
        catch (e) {
            console.log("walletConnect failed:", e);
            response = {
                responseCode: wallets_1.ConnectorResponseCode.UnknownEror
            };
            reject(response);
        }
    }));
});
exports.default = connectWalletConnect;
//# sourceMappingURL=walletConnect.js.map