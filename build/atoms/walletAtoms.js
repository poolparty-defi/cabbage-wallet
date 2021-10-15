"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseCodeAtom = exports.walletProviderAtom = exports.selectedWalletAtom = exports.connectedAtom = void 0;
const jotai_1 = require("jotai");
exports.connectedAtom = jotai_1.atom(false);
exports.selectedWalletAtom = jotai_1.atom(undefined);
exports.walletProviderAtom = jotai_1.atom(undefined);
exports.responseCodeAtom = jotai_1.atom(undefined);
//# sourceMappingURL=walletAtoms.js.map