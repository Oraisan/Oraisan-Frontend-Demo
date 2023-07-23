import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

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
      setPiA(proofData.proof.pi_a.join(", "));
      setPiB(proofData.proof.pi_b.map((arr) => arr.join(", ")).join("; "));
      setPiC(proofData.proof.pi_c.join(", "));
      setEthBridge(proofData.public[0])
      setReceiver(proofData.public[1])
      setAmount(proofData.public[2])
      setEthToken(proofData.public[3])
      setKey(proofData.public[4])
      setDepositRoot(proofData.public[5])

      // Fill other fields with data from proofData.public...
    }
  }, [proofData]);

  const tokenAddresses = {
    BTC: "0x38A9877c82C53cA48D64E3c2176295df60F0d826", // Replace with the actual BTC token address
    ETH: "0x38A9877c82C53cA48D64E3c2176295df60F0d826", // Replace with the actual ETH token address
    XRP: "0x38A9877c82C53cA48D64E3c2176295df60F0d826", // Replace with the actual XRP token address
    HIJIN: "0x38A9877c82C53cA48D64E3c2176295df60F0d826", // Replace with the actual HIJIN token address
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

  const handleClaim = () => {
    // Implement claim logic here
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
          disabled
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
