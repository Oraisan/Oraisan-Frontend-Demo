// claimTransaction.js
const Web3 = require("web3");
const abi = require("../abi/oraisanBridge.json")

const claimTransaction = async (proofData) => {
    const web3Sender = new Web3(window.ethereum);
    const contractSender = new web3Sender.eth.Contract(abi, proofData.eth_bridge_address);

    console.log("contractSender", contractSender)
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const ethAddress = accounts[0];
        console.log(
            proofData.eth_bridge_address,
            proofData.eth_receiver_address,
            proofData.amount,
            proofData.eth_token_address,
            proofData.key,
            proofData.deposit_root
            )
        const res = await contractSender.methods
            .claimTransaction(
                [
                    "VERIFIER_CLAIM_TRANSACTION",
                    proofData.pi_a,
                    proofData.pi_b,
                    proofData.pi_c,
                    proofData.eth_bridge_address,
                    proofData.eth_receiver_address,
                    proofData.amount,
                    proofData.eth_token_address,
                    proofData.key,
                    proofData.deposit_root
                ]
            )
            .send({ from: ethAddress, gasPrice: Web3.utils.toWei('10', 'gwei'), });
        await res.wait();
    } catch (error) {
        // Handle any errors that occur during the connection
        console.error("Failed to connect to Metamask wallet:", error);
    }
};

exports.claimTransaction = claimTransaction;
