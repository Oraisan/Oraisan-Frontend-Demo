import React, { useState, useEffect } from "react";
import {Container, Grid } from "@mui/material";
import Body from "./Body";
import Header from "./Header";
import { ETH_NETWORK } from "src/constants";

function Bridge() {
  const [cosmosSender, setCosmosSender] = useState("");
  const [ethReceiver, setEthReceiver] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [keplrNetworkChain, setKeplrNetworkChain] = useState("");
  const [metamaskNetworkChain, setMetamaskNetworkChain] = useState("");

  useEffect(() => {
    // Add event listener for Kepler chain changes
    if (window.keplr && window.keplr.experimentalSubscribe) {
      const subscription = window.keplr.experimentalSubscribe({
        type: "chain-event",
        chainIds: ["Oraichain-testnet"], // Add your Cosmos chain ID here
      });

      subscription.on("data", (event) => {
        if (event.type === "chain-changed") {
          handleKeplerDisconnect();
        }
      });

      return () => {
        subscription.off("data");
      };
    }

    // Add event listener for MetaMask chain changes
    if (window.ethereum) {
      const handleMetamaskChainChange = (chainId) => {
        setMetamaskNetworkChain(ETH_NETWORK[chainId]?.name)
      };

      window.ethereum.on("chainChanged", handleMetamaskChainChange);
      handleMetamaskChainChange(window.ethereum.chainId);

      return () => {
        window.ethereum.off("chainChanged", handleMetamaskChainChange);
      };
    }
  }, []);

  const handleAmountChange = (event) => {
    setTokenAmount(event.target.value);
  };

  const handleRecipientAddressChange = (event) => {
    setEthReceiver(event.target.value);
  };

  const handleKeplerConnect = async () => {
    try {
      if (!window.keplr) {
        throw new Error("Keplr extension not found");
      }

      const chainId = "Oraichain-testnet";
      // Request access to Keplr
      await window.keplr.enable(chainId);

      // Get the sender address from Keplr
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      setCosmosSender(accounts[0].address);

      // Set the network chain to "Oraichain-testnet"
      setKeplrNetworkChain("Oraichain-testnet");

      console.log("Kepler connected");
      console.log("Cosmos Address:", accounts[0].address);
    } catch (error) {
      console.error("Failed to connect with Kepler:", error);
    }
  };

  const handleKeplerDisconnect = () => {
    setCosmosSender("");
    setKeplrNetworkChain("");
    console.log("Kepler disconnected");
  };

  const handleMetamaskConnect = async () => {
    try {
      // Connect to Metamask wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const ethAddress = accounts[0];

      // Update the eth receiver address
      setEthReceiver(ethAddress);

      // Set the network chain to "Ethereum Network"
      // Get the network ID from Metamask
      const chainId = await window.ethereum.request({
        method: "net_version",
      });

      setMetamaskNetworkChain(ETH_NETWORK[chainId]?.name)

      // Display a success message or perform any other actions
      console.log("Connected to Metamask wallet");
    } catch (error) {
      // Handle any errors that occur during the connection
      console.error("Failed to connect to Metamask wallet:", error);
    }
  };

  const handleTransfer = async () => {
    try {
      // Implement the transfer logic here
      console.log("Transfer initiated!");
      console.log("Cosmos Sender:", cosmosSender);
      console.log("ETH Receiver:", ethReceiver);
      console.log("Token Amount:", tokenAmount);

      // Display a success message or perform any other actions
      console.log("Transfer completed!");
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header
        handleKeplerConnect={handleKeplerConnect}
        handleMetamaskConnect={handleMetamaskConnect}
        keplrNetworkChain={keplrNetworkChain}
        metamaskNetworkChain={metamaskNetworkChain}
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Body
          keplrNetworkChain={keplrNetworkChain}
          metamaskNetworkChain={metamaskNetworkChain}
          tokenAmount={tokenAmount}
          handleAmountChange={handleAmountChange}
          ethReceiver={ethReceiver}
          handleRecipientAddressChange={handleRecipientAddressChange}
          cosmosSender={cosmosSender}
          handleTransfer={handleTransfer}
          maxWidth="sm" // Set the maxWidth prop here
        />
      </Grid>
    </Container>
  );
}

export default Bridge;
