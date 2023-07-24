// claimTransaction.js
const Web3 = require("web3");
const abi = require("../abi/oraisanBridge.json")
const { ETH_NETWORK } = require("../constants/index")

const claimTransaction = async (metamaskChainId, proofData) => {
    const web3Sender = new Web3(window.ethereum);
    const contractReader = new web3Sender.eth.Contract(abi, proofData.eth_bridge_address);
    console.log("contractReader", contractReader)
    try {
        const msg = await contractReader.methods
            .encodeProof(
                proofData.eth_bridge_address,
                proofData.eth_receiver_address,
                proofData.amount,
                proofData.eth_token_address,
                proofData.key
            )
            .call();

        const hash = web3Sender.utils.soliditySha3(
            { type: 'bytes', value: msg }
        );
        
        console.log("hash", hash)
        const isSent = await contractReader.methods
        .sentProof(hash)
        .call();

        return isSent;
    } catch (error) {
        // Handle any errors that occur during the connection
        console.error("Failed to connect to Metamask wallet:", error);
    }
};

exports.claimTransaction = claimTransaction;
