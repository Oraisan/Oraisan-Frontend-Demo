import { hexToDecimal } from "./utils";
import { SigningCosmWasmClient, toBinary } from "@cosmjs/cosmwasm-stargate";
import { Decimal } from "@cosmjs/math";
import BigNumber from "bignumber.js";
import { COSMOS_NETWORK, ETH_NETWORK } from "src/constants";


async function getWallet(keplrNetworkChain) {
  // Enable Keplr wallet
  const keplrWindow = window;
  if (!keplrWindow.getOfflineSigner || !keplrWindow.keplr) {
    throw new Error("Keplr extension not found");
  }

  // Request access to Keplr
  await keplrWindow.keplr.enable(keplrNetworkChain);

  // Get the offline signer from Keplr
  const offlineSigner = keplrWindow.getOfflineSigner(keplrNetworkChain);

  return offlineSigner;
}

async function getClient(keplrNetworkChain) {
  const wallet = await getWallet();
  const client = await SigningCosmWasmClient.connectWithSigner(COSMOS_NETWORK[keplrNetworkChain]?.rpc, wallet, {
    gasPrice: {
      denom: "orai",
      amount: Decimal.fromUserInput("0.001", 6),
    },
  });
  return client;
}

async function sendToken(keplrNetworkChain, metamaskNetworkChain, cosmosTokenAddress, amount, ethReceiver) {
  const wallet = await getWallet(keplrNetworkChain);
  const client = await getClient(keplrNetworkChain);
  const senderAddress = (await wallet.getAccounts())[0].address;
  console.log("wallet", wallet)
  console.log("client", client)
  console.log("senderAddress", senderAddress)
  const msg_bridge = {
    destination_chainid: metamaskNetworkChain,
    eth_bridge_address: ETH_NETWORK[metamaskNetworkChain]?.oraisan_bridge,
    eth_receiver: hexToDecimal(ethReceiver),
  };

  const msg = {
    send: {
      contract: COSMOS_NETWORK[keplrNetworkChain]?.cosmos_bridge, // Use COSMOS_BRIDGE as the contract address here
      amount: (new BigNumber(amount)).toFixed(), // Use BigNumber to handle large numbers
      msg: toBinary(msg_bridge)
    },
  };
  const fee = "auto"
  console.log("amount", msg.send.amount)
  console.log("msg", msg)
  const res = await client.execute(senderAddress, cosmosTokenAddress, msg, fee);
  return res;
}

export { sendToken };
