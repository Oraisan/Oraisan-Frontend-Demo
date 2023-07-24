// getClaimProof.js

import { bigNumberToHexString, convertHexStringToAddress } from "./utils";
import { BASE_API_URL } from "src/constants";

function processProofData(res) {
    const proofData = {
        pi_a: res.proof.pi_a.slice(0, 2),
        pi_b: res.proof.pi_b.slice(0, 2).map(e => e.reverse()),
        pi_c: res.proof.pi_c.slice(0, 2),
        eth_bridge_address: convertHexStringToAddress(bigNumberToHexString(res.public[0])),
        eth_receiver_address: convertHexStringToAddress(bigNumberToHexString(res.public[1])),
        amount: res.public[2],
        eth_token_address: convertHexStringToAddress(bigNumberToHexString(res.public[3])),
        key: res.public[4],
        deposit_root: res.public[5]
    }
    return proofData
}

async function getClaimProof(key) {
    try {
      const response = await fetch(BASE_API_URL + `proof/${key}`);
      const res = await response.json();
    //   console.log("res", res)
      const proofData = processProofData(res)
      console.log("Proof data:", res);
      return proofData;
    } catch (error) {
      console.error("Error fetching proof:", error);
      return null;
    }
  };
  
  export {getClaimProof};
  