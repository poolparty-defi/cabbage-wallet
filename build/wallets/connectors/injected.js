"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const wallets_1 = require("../wallets");
const connectInjected = async () => new Promise(async (resolve, reject) => {
    let response;
    try {
        if (typeof window.ethereum === "undefined") {
            response = {
                responseCode: wallets_1.ConnectorResponseCode.NoProvider
            };
            reject(response);
            return;
        }
        const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum, "any");
        try {
            await provider.send("eth_requestAccounts", []);
            response = {
                responseCode: wallets_1.ConnectorResponseCode.Success,
                provider
            };
            resolve(response);
        }
        catch (e) {
            response = {
                responseCode: e.code && e.code === -32002 ? wallets_1.ConnectorResponseCode.Pending : wallets_1.ConnectorResponseCode.UserRejected
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
exports.default = connectInjected;
//# sourceMappingURL=injected.js.map