import Web3 from "web3";
import contractAbi from "../../contracts/Crowdfunding.json";
import { connectWeb3 } from "./web3";

const crowdfundingAddress = "0x3851db51a7566A574800B38700d7600C27EfEF97";
const crowdfundingAbi = contractAbi.abi;

export const fetchingTransaction = async (campaignId) => {
  const web3 = await connectWeb3();
  const contract = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);
  try {
    const contributors = await contract.methods.getContributors(campaignId).call();
    return contributors;
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw error;
  }
};
