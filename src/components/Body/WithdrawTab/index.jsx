import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { claimTransaction } from "src/contracts/claimTransaction"; // Import the claimTransaction function
import { TOKENS } from "src/constants";

const WithdrawTab = ({
  ethReceiver,
  handleRecipientAddressChange,
  handleTransfer,
  proofData,
}) => {
  const [piA, setPiA] = useState("");
  const [piB, setPiB] = useState("");
  const [piC, setPiC] = useState("");
  const [ethBridge, setEthBridge] = useState("0x8eD37c644b5e5Fa92721dAe574a1a88Ba15dF656");
  const [receiver, setReceiver] = useState(ethReceiver);
  const [amount, setAmount] = useState("");
  const [ethToken, setEthToken] = useState("");
  const [key, setKey] = useState("");
  const [depositRoot, setDepositRoot] = useState("");

  useEffect(() => {
    if (proofData) {
      console.log(proofData)
      setPiA(proofData.pi_a.join(", "));
      setPiB(proofData.pi_b.map((arr) => arr.join(", ")).join("; "));
      setPiC(proofData.pi_c.join(", "));
      setEthBridge(proofData.eth_bridge_address)
      setReceiver(proofData.eth_receiver_address)
      setAmount(proofData.amount)

      let symbol = getSymbolByEthAddress(proofData.eth_token_address);

      setEthToken(symbol)
      setKey(proofData.key)
      setDepositRoot(proofData.deposit_root)

      // Fill other fields with data from proofData.public...
    }
  }, [proofData]);

  const getSymbolByEthAddress = (eth_address) => {
    const coinData = Object.values(TOKENS).find(
      (coin) => coin.eth_address.toLowerCase() === eth_address.toLowerCase()
    );
    return coinData ? coinData.symbol : null;
  };

  const handlePiAChange = (event) => {
    setPiA(event.target.value);
  };

  const handlePiBChange = (event) => {
    setPiB(event.target.value);
  };

  const handlePiCChange = (event) => {
    setPiC(event.target.value);
  };

  const handleEthBridgeChange = () => {
    // The "ETH Bridge" field is already pre-filled and does not need to be changed.
  };

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleEthTokenChange = (event) => {
    const selectedToken = event.target.value;
    setEthToken(selectedToken);
    // We store the token name in the state, and the "ETH Bridge" field will be empty until the "Claim" button is clicked.
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleDepositRootChange = (event) => {
    setDepositRoot(event.target.value);
  };

  const handleClaim = async () => {
    try {
      // Call the claimTransaction function with the proofData
      await claimTransaction(proofData);
      // Perform any actions or show success message as needed
    } catch (error) {
      console.error("Error claiming transaction:", error);
      // Handle errors or show error message
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Pi_a"
          value={piA}
          onChange={handlePiAChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Pi_b"
          value={piB}
          onChange={handlePiBChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Pi_c"
          value={piC}
          onChange={handlePiCChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="ETH Bridge"
          value={ethBridge}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="ETH Receiver"
          value={receiver}
          onChange={handleReceiverChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Amount"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          label="ETH Token"
          value={ethToken}
          onChange={handleEthTokenChange}
          fullWidth
        >
          <MenuItem value="BTC">BTC</MenuItem>
          <MenuItem value="ETH">ETH</MenuItem>
          <MenuItem value="XRP">XRP</MenuItem>
          <MenuItem value="HIJIN">HIJIN</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Key" value={key} onChange={handleKeyChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Deposit Root"
          value={depositRoot}
          onChange={handleDepositRootChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={handleClaim}
          fullWidth
        >
          Claim
        </Button>
      </Grid>
    </>
  );
};

export default WithdrawTab;
