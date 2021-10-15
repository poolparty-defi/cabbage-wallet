"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_provider_1 = __importDefault(require("@walletconnect/web3-provider"));
const ethers_1 = require("ethers");
const wallets_1 = require("../wallets");
const connectWalletConnect = async (walletConnectOpts) => new Promise(async (resolve, reject) => {
    let response;
    try {
        if (!walletConnectOpts) {
            response = {
                responseCode: wallets_1.ConnectorResponseCode.UnknownEror
            };
            reject(response);
            return;
        }
        const walletConnectProvider = new web3_provider_1.default(walletConnectOpts);
        try {
            await walletConnectProvider.enable();
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
        response = {
            responseCode: wallets_1.ConnectorResponseCode.UnknownEror
        };
        reject(response);
    }
});
exports.default = connectWalletConnect;
//# sourceMappingURL=walletConnect.js.map