import { Box, Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Wallet } from "src/icons";
import connectWallet from "src/web3/wallet/handle-connection";

const useStyles = makeStyles((theme) => ({
  button: {
    border: 0,
    textTransform: "capitalize",
    padding: theme.spacing(1.2, 1),
    minWidth: "163px",
    background: "linear-gradient(100.42deg, #2C85EE 16.07%, #4FB5FF 79.2%)",
    [theme.breakpoints.between("1053", "1099")]: {
      minWidth: 118,
      padding: "5px 8px",
    },
    [theme.breakpoints.between("0", "420")]: {
      minWidth: 118,
      padding: "5px 8px",
    },
  },
  inner: {
    [theme.breakpoints.between("1053", "1099")]: {
      width: "70px",
    },
    [theme.breakpoints.between("0", "420")]: {
      width: "70px",
    },
  },
  fiberIcon: {
    fontSize: 10,
    verticalAlign: "middle",
    marginRight: 2,
    color: "#C4C4C4",
  },
}));



function ConnectWalletButton({setEthReceiver}) {
  const classes = useStyles();

  const handleMetamaskConnect = async () => {
    try {
      // Connect to Metamask wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const ethAddress = accounts[0];

      // Update the eth receiver address
      setEthReceiver(ethAddress);

      // Display a success message or perform any other actions
      console.log("Connected to Metamask wallet");
    } catch (error) {
      // Handle any errors that occur during the connection
      console.error("Failed to connect to Metamask wallet:", error);
    }
  };
  return (
    <Fragment>
      <Button size="small" className={classes.button} variant="outlined" onClick={() => handleMetamaskConnect()}>
        <Box display="flex" alignItems="center">
          <Wallet size={22} />
          <Box pl={1.5} display="flex" alignItems="center" className={classes.inner}>
            <span style={{ fontSize: 15, lineHeight: "18px" }}>Connect Wallet</span>
          </Box>
        </Box>
      </Button>
    </Fragment>
  );
}

export default ConnectWalletButton;
