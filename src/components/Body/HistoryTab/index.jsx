// HistoryTab.js

import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { BASE_API_URL } from "src/constants";
import { formatAddress } from "src/services/utils";

const HistoryTab = ({ cosmosSender, ethReceiver, handleClaim }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      let url = BASE_API_URL + "infor?";
      try {
        if (cosmosSender) {
          url = url + "sender=" + cosmosSender + "&";
        }

        if (ethReceiver) {
          url = url + "receiver=" + ethReceiver;
        }
        console.log(url);
        setIsFetching(true);
        await fetch(BASE_API_URL + "query");
        console.log(isFetching);
        const response = await fetch(url);
        const data = await response.json();
        setTransactionHistory(data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        setIsFetching(false);
      }
    };
    if (cosmosSender && ethReceiver) fetchTransactionHistory();
  }, [cosmosSender, ethReceiver]);

  return (
    <Grid item xs={12}>
      <Typography variant="h6">Transaction History</Typography>
      {(!cosmosSender || !ethReceiver) && (
        <Typography
          sx={{
            p: 2,
            mt: 2,
            background: "rgba(125, 209, 255, 0.5)",
            borderRadius: "10px",
            border: "2px solid rgba(125, 209, 255)",
          }}
        >
          Please connect your wallets to see the transaction history
        </Typography>
      )}
      {isFetching === true && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ mt: 1 }} />
          <Typography sx={{ mt: 1 }}>
            Fetching latest transaction history...
          </Typography>
        </Box>
      )}
      {isFetching === false && (
        <>
          {transactionHistory.length === 0 ? (
            <Typography variant="body2">
              {cosmosSender && ethReceiver && "No transaction history found."}
            </Typography>
          ) : (
            transactionHistory.map((transaction, index) => (
              <Accordion key={transaction._id}>
                <AccordionSummary
                  sx={{ position: "relative" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography variant="body1">
                    {transaction.is_deposit
                      ? `Deposit ${transaction.key}`
                      : `Withdraw ${transaction.key}`}
                  </Typography>
                  {!transaction.is_deposit && (
                    <Button
                      sx={{
                        position: "absolute",
                        right: 60,
                        top: "50%",
                        height: "30px",
                        transform: "translateY(-50%)",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleClaim(transaction.key)}
                    >
                      Claim
                    </Button>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    rowSpacing={1}
                    sx={{
                      background: "#e8f8ff",
                      p: 2,
                      borderRadius: "10px",
                      border: "1.5px solid #cfcfcf",
                    }}
                  >
                    <Grid item xs={5}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ opacity: 0.8 }}
                      >
                        Sender:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {formatAddress(transaction.sender, 15)}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ opacity: 0.8 }}
                      >
                        Destination Chain ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {transaction.destination_chainid}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ opacity: 0.8 }}
                      >
                        ETH Bridge Address:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {formatAddress(transaction.eth_bridge_address, 15)}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ opacity: 0.8 }}
                      >
                        ETH Receiver:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {formatAddress(transaction.eth_receiver, 15)}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        sx={{ opacity: 0.8 }}
                      >
                        Amount:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {transaction.amount}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        fontWeight="bold"
                        sx={{ opacity: 0.8 }}
                        variant="body2"
                      >
                        ETH Token Address:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {formatAddress(transaction.eth_token_address, 15)}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        fontWeight="bold"
                        sx={{ opacity: 0.8 }}
                        variant="body2"
                      >
                        Cosmos Token Address:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {formatAddress(transaction.cosmos_token_address, 15)}
                      </Typography>
                    </Grid>
                    <Grid item xs={5} fontWeight="bold">
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.8 }}
                        fontWeight="bold"
                      >
                        Key:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">{transaction.key}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.8 }}
                        fontWeight="bold"
                      >
                        Value:
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2">
                        {formatAddress(transaction.value, 15)}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
                <Grid container justifyContent="flex-end"></Grid>
              </Accordion>
            ))
          )}
        </>
      )}
    </Grid>
  );
};

export default HistoryTab;
