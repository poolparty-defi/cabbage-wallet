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
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const wallets_1 = require("../wallets");
const connectInjected = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
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
                yield provider.send("eth_requestAccounts", []);
                response = {
                    responseCode: wallets_1.ConnectorResponseCode.Success,
                    provider
                };
                window.ethereum.on("chainChanged", () => window.location.reload());
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
    }));
});
exports.default = connectInjected;
//# sourceMappingURL=injected.js.map