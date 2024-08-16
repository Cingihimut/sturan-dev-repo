import Web3 from "web3";
import contractAbi from "../../contracts/Crowdfunding.json";
import { connectWeb3 } from "./web3";

const crowdfundingAddress = "0x080140434c2a4198F73bEA2829347521340e31cf";
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
