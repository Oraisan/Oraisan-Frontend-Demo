import React from "react";
import { Button, Box, Typography } from "@mui/material";
import keplerIcon from "../../assets/Keplr_icon_ver.1.3_2.svg";

const Header = ({
  handleKeplerConnect,
  handleMetamaskConnect,
  keplrNetworkChain,
  metamaskNetworkChain,
}) => {
  return (
    <Box
      py={2}
      px={5}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: "monospace" }}>
        Cosmos to Ethereum Bridge
      </Typography>

      <Box>
        {keplrNetworkChain ? (
          <Button
            variant="contained"
            startIcon={
              <img
                src={keplerIcon}
                width="30px"
                height="30px"
                alt="keplerIcon"
              />
            }
            sx={{ mr: 3 }}
            onClick={handleKeplerConnect}
          >
            {keplrNetworkChain}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={
              <img
                src={keplerIcon}
                width="30px"
                height="30px"
                alt="keplerIcon"
              />
            }
            sx={{ mr: 3 }}
            onClick={handleKeplerConnect}
          >
            Connect Kepler
          </Button>
        )}
        {metamaskNetworkChain ? (
          <Button
            variant="contained"
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="metamask"
                width="30px"
                height="30px"
              />
            }
            onClick={handleMetamaskConnect}
          >
            {metamaskNetworkChain}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="metamask"
                width="30px"
                height="30px"
              />
            }
            onClick={handleMetamaskConnect}
          >
            Connect Metamask
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
