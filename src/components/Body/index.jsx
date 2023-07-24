// Body.js

import { getClaimProof } from "src/contracts/getClaimProof";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import DepositTab from "./DepositTab";
import WithdrawTab from "./WithdrawTab";
import HistoryTab from "./HistoryTab";

const Body = ({
  keplrNetworkChain,
  metamaskNetworkChain,
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
    const proofData = await getClaimProof(key); // Call the getClaimProof function
    if (proofData) {
      setProofData(proofData);
      setClaimClicked(true);
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
            keplrNetworkChain={keplrNetworkChain}
            metamaskNetworkChain={metamaskNetworkChain}
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
            <HistoryTab
              cosmosSender={cosmosSender}
              ethReceiver={ethReceiver}
              handleClaim={handleClaim}
            />
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
