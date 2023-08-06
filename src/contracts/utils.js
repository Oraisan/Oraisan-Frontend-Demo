import BigNumber from "bignumber.js";
import { toChecksumAddress } from "ethereumjs-util";

function hexToDecimal(hex) {
  // Remove the '0x' prefix if present
  console.log("hhex", hex);
  if (hex.startsWith("0x")) {
    hex = hex.slice(2);
  }

  console.log("hex1", hex);
  // Ensure that the input hexadecimal value is valid
  if (!/^[0-9A-Fa-f]+$/.test(hex)) {
    throw new Error("Invalid hexadecimal value");
  }

  // Convert the hexadecimal string to a decimal string using BigNumber
  const decimalString = new BigNumber("0x" + hex.toUpperCase()).toFixed();
  console.log("hex2", decimalString);
  return decimalString;
}

function convertHexStringToAddress(hexString) {
  var strippedHex = hexString.replace(/^0x/, "");
  console.log("hehe", strippedHex.length);
  if (strippedHex.length < 40) {
    strippedHex = "0".repeat(40 - strippedHex.length) + strippedHex;
  }
  return toChecksumAddress(`0x${strippedHex}`);
}

const bigNumberToHexString = (input) => {
  const bigNumber = new BigNumber(input);
  return "0x" + bigNumber.toString(16);
};

export { hexToDecimal, convertHexStringToAddress, bigNumberToHexString };
