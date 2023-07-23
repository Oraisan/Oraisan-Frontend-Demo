import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

const Header = ({
  handleKeplerConnect,
  handleMetamaskConnect,
  keplrNetworkChain,
  metamaskNetworkChain,
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Cosmos to Ethereum Bridge
        </Typography>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end">
        {keplrNetworkChain ? (
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={handleKeplerConnect}
          >
            {keplrNetworkChain}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={handleKeplerConnect}
          >
            Connect Kepler
          </Button>
        )}
        {metamaskNetworkChain ? (
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={handleMetamaskConnect}
          >
            {metamaskNetworkChain}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={handleMetamaskConnect}
          >
            Connect Metamask
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
