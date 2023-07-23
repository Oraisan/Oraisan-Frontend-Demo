// Body.js

import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import DepositTab from "./DepositTab";
import WithdrawTab from "./WithdrawTab";
import HistoryTab from "./HistoryTab";

const Body = ({
  tokenAmount,
  handleAmountChange,
  ethReceiver,
  handleRecipientAddressChange,
  cosmosSender,
  keplerConnected,
  handleTransfer,
  maxWidth,
}) => {
  const [tab, setTab] = useState("deposit");
  const [claimClicked, setClaimClicked] = useState(false);
  const [proofData, setProofData] = useState(null);

  useEffect(() => {
    // When claimClicked is set to true, switch to the "withdraw" tab
    if (claimClicked) {
      setTab("withdraw");
    }
  }, [claimClicked]);

  const handleClaim = async (key) => {
    try {
      const response = await fetch(`http://104.197.22.23:8000/api/proof/${key}`);
      const proofData = await response.json();
      console.log("Proof data:", proofData);
      setClaimClicked(true);
      setProofData(proofData);
    } catch (error) {
      console.error("Error fetching proof:", error);
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const renderTabContent = () => {
    switch (tab) {
      case "deposit":
        return (
          <DepositTab
            tokenAmount={tokenAmount}
            handleAmountChange={handleAmountChange}
            ethReceiver={ethReceiver}
            handleRecipientAddressChange={handleRecipientAddressChange}
            cosmosSender={cosmosSender}
            handleTransfer={handleTransfer}
          />
        );
      case "withdraw":
        return (
          <WithdrawTab
            ethReceiver={ethReceiver}
            handleRecipientAddressChange={handleRecipientAddressChange}
            handleTransfer={handleTransfer}
            proofData={proofData} // Pass proofData to WithdrawTab
          />
        );
      case "history":
        return (
          <>
            {/* Other components... */}
            <HistoryTab cosmosSender={cosmosSender} handleClaim={handleClaim} />
            {/* Other components... */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      spacing={2}
      maxWidth="sm"
      sx={{
        display: "block",
        minHeight: "100vh",
      }}
    >
      <Box mb={2} my="2rem">
        <Button
          variant={tab === "deposit" ? "contained" : "outlined"}
          onClick={() => handleTabChange("deposit")}
        >
          Deposit
        </Button>
        <Button
          variant={tab === "withdraw" ? "contained" : "outlined"}
          onClick={() => handleTabChange("withdraw")}
        >
          Withdraw
        </Button>
        <Button
          variant={tab === "history" ? "contained" : "outlined"}
          onClick={() => handleTabChange("history")}
        >
          History
        </Button>
      </Box>
      <Grid container spacing={2}>
        {renderTabContent()}
      </Grid>
    </Container>
  );
};

export default Body;
