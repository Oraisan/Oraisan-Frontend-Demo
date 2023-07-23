import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { queryUserTokenBalance } from "src/services/kelpWallet";

const DepositTab = ({
  tokenAmount,
  handleAmountChange,
  ethReceiver,
  handleRecipientAddressChange,
  cosmosSender,
  handleTransfer,
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [balance, setBalance] = useState(0);

  const handleCoinChange = async (event) => {
    setSelectedCoin(event.target.value);

    // Update the balance based on the selected coin and user's Kepler address
    const coinBalance = await getCoinBalance(event.target.value, cosmosSender);
    setBalance(coinBalance);
    handleAmountChange(event, coinBalance);
  };

  const handleMaxAmount = (balance) => {
    handleAmountChange({ target: { value: balance.balance } });
  };

  // Function to get the balance of a coin
  const getCoinBalance = async (coin, keplerAddress) => {
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
        return 0;
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
                  onClick={() => handleMaxAmount(balance)}
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
          >
            Transfer
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DepositTab;
