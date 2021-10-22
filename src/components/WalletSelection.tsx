import React from "react"
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import wallets, { Wallet } from "../wallets/wallets"

const useStyles = makeStyles(() => ({
    walletLogo: {
        width: "20%",
        height: "20%"
    }
}))

const WalletSelection = (props: { connect: (wallet: Wallet) => Promise<void> }): JSX.Element => {
    const classes = useStyles()
    return (
        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
            {
                wallets.map(wallet => (
                    <Grid item key={wallet.name} component={Button} onClick={async () => await props.connect(wallet)}>
                        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                            <Grid item>
                                <img className={classes.walletLogo} src={wallet.icon} alt={`${wallet.name}_icon`} />
                            </Grid>

                            <Grid item>
                                <Typography variant="h4">{wallet.name}</Typography>
                            </Grid>

                            <Grid item>
                                <Typography color="textSecondary">{wallet.desc}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default WalletSelection