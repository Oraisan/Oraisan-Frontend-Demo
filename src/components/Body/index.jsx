// Body.js

import { getClaimProof } from "src/contracts/getClaimProof";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import DepositTab from "./DepositTab";
import WithdrawTab from "./WithdrawTab";
import HistoryTab from "./HistoryTab";
import bridgeBackground from "src/assets/background.jpg";

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
  const [tab, setTab] = useState(0);
  const [claimClicked, setClaimClicked] = useState(false);
  const [proofData, setProofData] = useState(null);
  const handleSwitchTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    // When claimClicked is set to true, switch to the "withdraw" tab
    if (claimClicked) {
      setTab(1);
    }
  }, [claimClicked]);

  const handleClaim = async (key) => {
    const proofData = await getClaimProof(key); // Call the getClaimProof function
    if (proofData) {
      setProofData(proofData);
      setClaimClicked(true);
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        backgroundImage: `url(${bridgeBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
        boxSizing: "border-box",
        zIndex: 200,
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.7)",
          minWidth: "1000px",
          backdropFilter: "blur(45px)",
          borderRadius: "20px",
        }}
      >
        <Tabs value={tab} onChange={handleSwitchTab} sx={{ my: 4 }} centered>
          <Tab
            label="Deposit"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
          <Tab
            label="Withdraw"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
          <Tab
            label="History"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
        </Tabs>
        <Container
          spacing={2}
          maxWidth="sm"
          sx={{
            display: "block",
            minHeight: "100vh",
            padding: "none",
          }}
        >
          <Grid container spacing={2}>
            {tab === 0 && (
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
            )}
            {tab === 1 && (
              <WithdrawTab
                metamaskNetworkChain={metamaskNetworkChain}
                ethReceiver={ethReceiver}
                // handleRecipientAddressChange={handleRecipientAddressChange}
                // handleTransfer={handleTransfer}
                proofData={proofData} // Pass proofData to WithdrawTab
              />
            )}
            {tab === 2 && (
              <HistoryTab
                cosmosSender={cosmosSender}
                ethReceiver={ethReceiver}
                handleClaim={handleClaim}
              />
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Body;
