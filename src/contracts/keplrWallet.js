import { Window as KeplrWindow } from "@keplr-wallet/types";
import { CosmWasmClient, SigningCosmWasmClient, setupWasmExtension } from "@cosmjs/cosmwasm-stargate";



// Function to query the user's token balance
export const queryUserTokenBalance = async (keplerAddress, contractAddress, rpcUrl) => {
    // Set up the CosmWasmClient
    const _nonUserClient = await SigningCosmWasmClient.connect(rpcUrl)

    const msg = {
        balance: {
            address: keplerAddress
        }
    }
    try {
        const balance = await _nonUserClient.queryContractSmart(
            contractAddress,
            msg
        )
        return balance;
    } catch (error) {
        console.error("Error querying token balance:", error);
        return 0;
    }
};
