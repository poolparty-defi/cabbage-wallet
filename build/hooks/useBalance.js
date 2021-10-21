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
const jotai_1 = require("jotai");
const walletAtoms_1 = require("../atoms/walletAtoms");
const useBalance = () => {
    const [provider] = jotai_1.useAtom(walletAtoms_1.walletProviderAtom);
    const [connected] = jotai_1.useAtom(walletAtoms_1.connectedAtom);
    const getBalance = () => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!connected || !provider) {
                    reject();
                    return;
                }
                const signer = provider.getSigner();
                if (!signer) {
                    reject();
                    return;
                }
                const address = yield signer.getAddress();
                const balance = yield provider.getBalance(address);
                let formattedBalance = ethers_1.ethers.utils.formatEther(balance);
                if (!formattedBalance) {
                    formattedBalance = "0";
                }
                resolve(formattedBalance);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
    return {
        getBalance
    };
};
exports.default = useBalance;
//# sourceMappingURL=useBalance.js.map