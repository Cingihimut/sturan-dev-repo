import { createContractInstance } from "./contract";
import { contractIstanceDeltaVenturesFund } from "./contract";
import { connectWeb3 } from "./web3";
import xtrContractJson from "../../contracts/Xtr.json";
import Web3 from "web3";
const xtrAbi = xtrContractJson.abi;
const xtrAddress = "0x086D459A513f10abec41B5839aF688f68EFE0abb";

export const approveToken = async (crowdfundingAddress, amount) => {
  try {
    const web3 = await connectWeb3();
    const tokenContract = new web3.eth.Contract(xtrAbi, xtrAddress);

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    const amountInWei = Web3.utils.toWei(amount.toString(), "ether")

    await tokenContract.methods.approve(crowdfundingAddress, amountInWei).send({
      from: sender,
    });
    console.log("Token approved for crowdfunding contract");
  } catch (error) {
    console.error("Error approving token:", error);
  }
};

export const fundCrowdfunding = async (amount) => {
  try {
    const web3 = await connectWeb3();
    const contract = await createContractInstance();
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    const amountInWei = Web3.utils.toWei(amount.toString(), "ether")

    const receipt = await contract.methods.fund(amountInWei).send({ from: sender });
    console.log("Transaction receipt:", receipt);
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error funding crowdfunding:", error);
    return null;
  }
};
