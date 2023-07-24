// HistoryTab.js

import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { BASE_API_URL } from "src/constants";

const HistoryTab = ({ cosmosSender, ethReceiver, handleClaim}) => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      let url = BASE_API_URL + "infor?"
      try {
        if (cosmosSender) {
          url = url +  "sender=" + cosmosSender + "&"
        } 

        if (ethReceiver) {
            url = url + "receiver=" + ethReceiver
        }
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        setTransactionHistory(data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };
    fetchTransactionHistory();
  }, [cosmosSender]);


  return (
    <Grid item xs={12}>
      <Typography variant="h6">Transaction History</Typography>
      {transactionHistory.length === 0 ? (
        <Typography variant="body2">No transaction history found.</Typography>
      ) : (
        transactionHistory.map((transaction, index) => (
          <Accordion key={transaction._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography variant="body1">
                {transaction.is_deposit ? `Deposit ${transaction.key}` : `Withdraw ${transaction.key}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">Sender:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.sender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Destination Chain ID:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.destination_chainid}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">ETH Bridge Address:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.eth_bridge_address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">ETH Receiver:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.eth_receiver}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Amount:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.amount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">ETH Token Address:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.eth_token_address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Cosmos Token Address:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.cosmos_token_address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Key:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.key}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Value:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{transaction.value}</Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
            <Grid container justifyContent="flex-end">
              {!transaction.is_deposit && (
                <Button variant="contained" color="primary" onClick={() => handleClaim(transaction.key)}>
                  Claim
                </Button>
              )}
            </Grid>

          </Accordion>
        ))
      )}
    </Grid>
  );
};

export default HistoryTab;
