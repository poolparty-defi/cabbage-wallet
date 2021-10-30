"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorResponseCode = void 0;
const icons_1 = require("../assets/icons");
const injected_1 = __importDefault(require("./connectors/injected"));
var ConnectorResponseCode;
(function (ConnectorResponseCode) {
    /**
     * A successful wallet connection was made
     */
    ConnectorResponseCode[ConnectorResponseCode["Success"] = 1] = "Success";
    /**
     * The user rejected the wallet connection
     */
    ConnectorResponseCode[ConnectorResponseCode["UserRejected"] = 2] = "UserRejected";
    /**
     * No wallet provider was found
     */
    ConnectorResponseCode[ConnectorResponseCode["NoProvider"] = 3] = "NoProvider";
    /**
     * A connection request is already pending
     */
    ConnectorResponseCode[ConnectorResponseCode["Pending"] = 4] = "Pending";
    /**
     * An unkown error occurred
     */
    ConnectorResponseCode[ConnectorResponseCode["UnknownEror"] = 5] = "UnknownEror";
})(ConnectorResponseCode = exports.ConnectorResponseCode || (exports.ConnectorResponseCode = {}));
const wallets = [
    {
        name: "MetaMask",
        desc: "Connect to your MetaMask Wallet",
        icon: icons_1.metamaskIcon,
        connector: injected_1.default
    },
    // {
    //     name: "WalletConnect",
    //     desc: "Scan with WalletConnect",
    //     icon: walletConnectIcon,
    //     connector: connectWalletConnect
    // }
];
exports.default = wallets;
//# sourceMappingURL=wallets.js.map