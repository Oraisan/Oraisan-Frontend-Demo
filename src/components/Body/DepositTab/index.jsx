import React, { useState } from "react";
import { Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { queryUserTokenBalance } from "src/services/kelpWallet";
import { sendToken } from "src/services/transferToken";

const DepositTab = ({
  tokenAmount,
  handleAmountChange,
  ethReceiver,
  handleRecipientAddressChange,
  cosmosSender,
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [balance, setBalance] = useState({ balance: 0 });
  const [cosmosTokenAddress, setCosmosTokenAddress] = useState("");

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
      // Call the sendToken function here
      const res = await sendToken(cosmosTokenAddress, tokenAmount, ethReceiver);
      console.log("Transaction result:", res);
      // Perform any actions or show success message as needed
    } catch (error) {
      console.error("Error transferring tokens:", error);
      // Handle errors or show error message
    }
  };

  // Function to get the balance of a coin
  const getCoinBalance = async (coin, keplerAddress) => {
    // Switch case to handle different coin balances
    switch (coin) {
      case "BTC":
        // Query balance of BTC token for the user's Kepler address
        // Replace with your implementation
        return { balance: 0 };

      case "ETH":
        // Query balance of ETH token for the user's Kepler address
        // Replace with your implementation
        return { balance: 0 };

      case "XRP":
        // Query balance of XRP token for the user's Kepler address
        // Replace with your implementation
        return { balance: 0 };

      case "HIJIN":
        // Query balance of HIJIN token for the user's Kepler address
        // Use the queryUserTokenBalance function from api.js
        return await queryUserTokenBalance(
          keplerAddress,
          "orai1wdd0qs5f2swxh2trmdvu2xu94qu49zpnqpmazj02ts2xkhqu3x4qu3smud",
          "https://testnet-rpc.orai.io:443/"
        );

      default:
        return { balance: 0 };
    }
  };

  // Function to get the cosmosTokenAddress based on the selected coin
  const getCosmosTokenAddress = (coin) => {
    // Switch case to handle different coin addresses
    switch (coin) {
      case "BTC":
        // Return the BTC token address
        return "orai1wdd0qs5f2swxh2trmdvu2xu94qu49zpnqpmazj02ts2xkhqu3x4qu3smud"; // Replace with the actual address

      case "ETH":
        // Return the ETH token address
        return "orai1wdd0qs5f2swxh2trmdvu2xu94qu49zpnqpmazj02ts2xkhqu3x4qu3smud"; // Replace with the actual address

      case "XRP":
        // Return the XRP token address
        return "orai1wdd0qs5f2swxh2trmdvu2xu94qu49zpnqpmazj02ts2xkhqu3x4qu3smud"; // Replace with the actual address

      case "HIJIN":
        // Return the HIJIN token address
        return "orai1wdd0qs5f2swxh2trmdvu2xu94qu49zpnqpmazj02ts2xkhqu3x4qu3smud"; // Replace with the actual address

      default:
        return "";
    }
  };

  return (
    <Container>
      <Grid container spacing={2} my="auto">
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
            label="Sender Address"
            value={cosmosSender}
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
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="XRP">XRP</MenuItem>
            <MenuItem value="HIJIN">HIJIN</MenuItem>
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
            Transfer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DepositTab;
