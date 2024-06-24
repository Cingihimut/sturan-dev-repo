import Web3 from "web3";
import contractAbi from "../../contracts/Crowdfunding.json";
import { connectWeb3 } from "./web3";

const crowdfundingAddress = "0x6fe9Eac96fdFCE9Bb73A2fB4D9b8744ce7018EAE";
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
