import Web3 from "web3";
import { connectWeb3 } from "./web3";
import xtrContractJson from "../../contracts/Xtr.json";
import { createContractInstance } from "./contract";

const xtrAbi = xtrContractJson.abi;
const xtrAddress = "0x09b138a87cdb0F638de7cED334bcBECA93C87e45";

export const approveToken = async (crowdfundingAddress, amount) => {
    try {
        const web3 = await connectWeb3();
        const tokenContract = new web3.eth.Contract(xtrAbi, xtrAddress);

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        const amountInWei = Web3.utils.toWei(amount.toString(), "ether");

        await tokenContract.methods.approve(crowdfundingAddress, amountInWei).send({ from: sender });
        console.log("Token approved for crowdfunding contract");
    } catch (error) {
        console.error("Error approving token:", error);
        throw error;
    }
};

export const contribute = async (campaignId, amount) => {
    try {
        const web3 = await connectWeb3();
        const contract = await createContractInstance();

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        const amountInWei = Web3.utils.toWei(amount.toString(), "ether");

        const receipt = await contract.methods.contribute(campaignId, amountInWei).send({ from: sender });

        console.log("Transaction receipt:", receipt);
        return receipt.transactionHash;
    } catch (error) {
        console.error("Error funding crowdfunding:", error);
        throw error;
    }
};
