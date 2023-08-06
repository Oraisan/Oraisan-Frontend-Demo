import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { queryUserTokenBalance } from "src/contracts/keplrWallet";
import { sendToken } from "src/contracts/transferToken";
import { TOKENS, COSMOS_NETWORK } from "src/constants";
import { useSnackbar } from "notistack";
const DepositTab = ({
  keplrNetworkChain,
  metamaskNetworkChain,
  tokenAmount,
  handleAmountChange,
  ethReceiver,
  handleRecipientAddressChange,
  cosmosSender,
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [balance, setBalance] = useState({ balance: 0 });
  const [cosmosTokenAddress, setCosmosTokenAddress] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [startTransaction, setStartTransaction] = useState(false);

  const handleCoinChange = async (event) => {
    setSelectedCoin(event.target.value);

    // Update the balance and cosmosTokenAddress based on the selected coin and user's Kepler address
    const coinBalance = await getCoinBalance(event.target.value, cosmosSender);
    setBalance(coinBalance);
    setCosmosTokenAddress(getCosmosTokenAddress(event.target.value)); // Set the cosmosTokenAddress based on the selected coin
    handleAmountChange({ target: { value: "" } });
  };

  const handleMaxAmount = () => {
    handleAmountChange({ target: { value: balance.balance } });
  };

  const handleTransfer = async () => {
    try {
      setStartTransaction(true);
      // Call the sendToken function here
      const res = await sendToken(
        keplrNetworkChain,
        metamaskNetworkChain,
        cosmosTokenAddress,
        tokenAmount,
        ethReceiver
      );
      console.log("Transaction result:", res);
      setStartTransaction(false);
      enqueueSnackbar("Transaction Completed!", {
        autoHideDuration: 3000,
        variant: "success",
      });

      // Perform any actions or show success message as needed
    } catch (error) {
      setStartTransaction(false);
      enqueueSnackbar("Transaction error!", {
        autoHideDuration: 3000,
        variant: "error",
      });
      console.error("Error transferring tokens:", error);
      // Handle errors or show error message
    }
  };

  // Function to get the balance of a coin
  const getCoinBalance = async (coin, keplerAddress) => {
    // Switch case to handle different coin balances
    try {
      return await queryUserTokenBalance(
        keplerAddress,
        TOKENS[coin]?.cosmos_address,
        COSMOS_NETWORK[keplrNetworkChain]?.rpc
      );
    } catch {
      return { balance: 0 };
    }
  };

  // Function to get the cosmosTokenAddress based on the selected coin
  const getCosmosTokenAddress = (coin) => {
    return TOKENS[coin]?.cosmos_address;
  };

  return (
    <Container>
      <Grid container spacing={2} my="auto">
        <Grid item xs={12}>
          <TextField
            label="Sender Address"
            value={cosmosSender}
            fullWidth
            disabled
            sx={{ fontWeight: "bold", color: "black" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Recipient Address"
            value={ethReceiver}
            onChange={handleRecipientAddressChange}
            fullWidth
            disabled
            sx={{ fontWeight: "bold", color: "black" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Select Coin"
            value={selectedCoin}
            onChange={handleCoinChange}
            fullWidth
          >
            {Object.keys(TOKENS).map((coin) => (
              <MenuItem key={coin} value={coin}>
                {coin}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            type="number"
            value={tokenAmount}
            onChange={handleAmountChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleMaxAmount()}
                >
                  Max
                </Button>
              ),
            }}
            error={parseFloat(tokenAmount) > parseFloat(balance.balance)}
            helperText={
              parseFloat(tokenAmount) > parseFloat(balance.balance)
                ? "Amount exceeds balance"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" sx={{ textAlign: "right" }}>
            Balance: {balance.balance}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTransfer}
            fullWidth
            disabled={
              !cosmosTokenAddress ||
              !ethReceiver ||
              !tokenAmount ||
              parseFloat(tokenAmount) > parseFloat(balance.balance)
            }
          >
            {startTransaction === true ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Transfer"
            )}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DepositTab;
