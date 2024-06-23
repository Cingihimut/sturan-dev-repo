import Web3 from "web3";
import contractAbi from "../../contracts/Crowdfunding.json";
import { connectWeb3 } from "./web3";

const crowdfundingAddress = "0x492b1E061bBaD5236fDA26d6f7075Bf83A180e51";
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
