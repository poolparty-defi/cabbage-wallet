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
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const wallets_1 = __importDefault(require("../wallets/wallets"));
const useStyles = core_1.makeStyles(() => ({
    walletLogo: {
        width: "20%",
        height: "20%"
    }
}));
const WalletSelection = (props) => {
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Grid, { container: true, justifyContent: "center", alignItems: "center", direction: "column", spacing: 2 }, wallets_1.default.map(wallet => (react_1.default.createElement(core_1.Grid, { item: true, key: wallet.name, component: core_1.Button, onClick: () => __awaiter(void 0, void 0, void 0, function* () { return yield props.connect(wallet); }) },
        react_1.default.createElement(core_1.Grid, { container: true, justifyContent: "center", alignItems: "center", direction: "column", spacing: 2 },
            react_1.default.createElement(core_1.Grid, { item: true },
                react_1.default.createElement("img", { className: classes.walletLogo, src: wallet.icon, alt: `${wallet.name}_icon` })),
            react_1.default.createElement(core_1.Grid, { item: true },
                react_1.default.createElement(core_1.Typography, { variant: "h4" }, wallet.name)),
            react_1.default.createElement(core_1.Grid, { item: true },
                react_1.default.createElement(core_1.Typography, { color: "textSecondary" }, wallet.desc))))))));
};
exports.default = WalletSelection;
//# sourceMappingURL=WalletSelection.js.map