"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const jotai_1 = require("jotai");
const walletAtoms_1 = require("../atoms/walletAtoms");
const useContract = () => {
    const [provider] = jotai_1.useAtom(walletAtoms_1.walletProviderAtom);
    const [connected] = jotai_1.useAtom(walletAtoms_1.connectedAtom);
    const getContract = (address, abi) => {
        if (!provider || !connected) {
            return null;
        }
        return new ethers_1.ethers.Contract(address, abi, provider.getSigner());
    };
    return {
        getContract
    };
};
exports.default = useContract;
//# sourceMappingURL=useContract.js.map