import React from "react"
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import wallets, { Wallet } from "../wallets/wallets"

const useStyles = makeStyles(theme => ({
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
}))

const WalletSelection = (props: { connect: (wallet: Wallet) => Promise<void> }) => {
    const classes = useStyles()
    return (
        <Paper className={classes.root} square>
            <Grid container direction="column" spacing={2}>
                {
                    wallets.map(wallet => (
                        <Grid item>
                            <Button variant="text" onClick={async () => await props.connect(wallet)}>
                                <Grid container direction="column" spacing={2}>
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
                            </Button>
                        </Grid>
                    ))
                }
            </Grid>
        </Paper>
    )
}

export default WalletSelection