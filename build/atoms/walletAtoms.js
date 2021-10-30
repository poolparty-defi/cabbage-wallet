"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkAtom = exports.walletProviderAtom = exports.connectedAtom = void 0;
const jotai_1 = require("jotai");
exports.connectedAtom = jotai_1.atom(false);
exports.walletProviderAtom = jotai_1.atom(undefined);
exports.networkAtom = jotai_1.atom(undefined);
//# sourceMappingURL=walletAtoms.js.map