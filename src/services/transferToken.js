import { SigningCosmWasmClient, EnigmaUtils, makeCosmoshubPath, toBinary } from "@cosmjs/cosmwasm-stargate";
import { Decimal } from "@cosmjs/math";
import BigNumber from "bignumber.js";

const rpcEndpoint = "https://testnet-rpc.orai.io:443/";
const cosmosBridgeAddress = "orai15frk4ljvkk9f6u7dsfu7xw0uq5w8dw9v3rq5ve2f5n4uuuykjk5qedlf2p";
const oraisanBridge = "0xD84960DfFD3918084A9412B4a79Bb611B18024A8";

function hexToDecimal(hex) {
  // Remove the '0x' prefix if present
  if (hex.startsWith("0x")) {
    hex = hex.slice(2);
  }

  console.log("hex1", hex)
  // Ensure that the input hexadecimal value is valid
  if (!/^[0-9A-Fa-f]+$/.test(hex)) {
    throw new Error("Invalid hexadecimal value");
  }

  // Convert the hexadecimal string to a decimal string using BigNumber
  const decimalString = (new BigNumber("0x" + hex.toUpperCase())).toFixed();
  console.log("hex2", decimalString)
  return decimalString;
}

async function getWallet() {
  // Enable Keplr wallet
  const keplrWindow = window;
  if (!keplrWindow.getOfflineSigner || !keplrWindow.keplr) {
    throw new Error("Keplr extension not found");
  }

  // Request access to Keplr
  const chainId = "Oraichain-testnet";
  await keplrWindow.keplr.enable(chainId);

  // Get the offline signer from Keplr
  const offlineSigner = keplrWindow.getOfflineSigner(chainId);

  return offlineSigner;
}

async function getClient() {
  const wallet = await getWallet();
  const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {
    gasPrice: {
      denom: "orai",
      amount: Decimal.fromUserInput("0.001", 6),
    },
  });
  return client;
}

async function sendToken(cosmosTokenAddress, amount, ethReceiver) {
  const wallet = await getWallet();
  const client = await getClient();
  const senderAddress = (await wallet.getAccounts())[0].address;
  console.log("wallet", wallet)
  console.log("client", client)
  console.log("senderAddress", senderAddress)
  const msg_bridge = {
    destination_chainid: 4002,
    eth_bridge_address: hexToDecimal(oraisanBridge),
    eth_receiver: hexToDecimal(ethReceiver),
  };

  const msg = {
    send: {
      contract: cosmosBridgeAddress, // Use COSMOS_BRIDGE as the contract address here
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
