"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const wallets_1 = __importDefault(require("../wallets/wallets"));
const useStyles = core_1.makeStyles(theme => ({
    root: {
        '& > *': {
            padding: theme.spacing(2),
            width: 450
        }
    },
    walletLogo: {
        width: "20%",
        height: "20%"
    }
}));
const WalletSelection = (props) => {
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Paper, { className: classes.root, square: true },
        react_1.default.createElement(core_1.Grid, { container: true, direction: "column", spacing: 2 }, wallets_1.default.map(wallet => (react_1.default.createElement(core_1.Grid, { item: true },
            react_1.default.createElement(core_1.Button, { variant: "text", onClick: props.connect },
                react_1.default.createElement(core_1.Grid, { container: true, direction: "column", spacing: 2 },
                    react_1.default.createElement(core_1.Grid, { item: true },
                        react_1.default.createElement("img", { className: classes.walletLogo, src: wallet.icon, alt: `${wallet.name}_icon` })),
                    react_1.default.createElement(core_1.Grid, { item: true },
                        react_1.default.createElement(core_1.Typography, { variant: "h4" }, wallet.name)),
                    react_1.default.createElement(core_1.Grid, { item: true },
                        react_1.default.createElement(core_1.Typography, { color: "textSecondary" }, wallet.desc))))))))));
};
exports.default = WalletSelection;
//# sourceMappingURL=WalletSelection.js.map