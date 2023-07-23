import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

const WithdrawTab = ({
  ethReceiver,
  handleRecipientAddressChange,
  handleTransfer,
}) => {
  const [receiver, setReceiver] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleTxHashChange = (event) => {
    setTxHash(event.target.value);
  };

  const handleClaim = () => {
    // Implement claim logic here
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Receiver"
          value={receiver}
          onChange={handleReceiverChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Transaction Hash"
          value={txHash}
          onChange={handleTxHashChange}
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
