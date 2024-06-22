import contractAbi from "../../contracts/Crowdfunding.json";
import { connectWeb3 } from "./web3";
import Web3 from "web3";

const crowdfundingTx = contractAbi.abi;
const crowdfundingAddress = "0x5535658acAA103e8a64E68Ec524dB48Ef89d0B25";

export const fetchingTransaction = async (campaignId) => {
  try {
    const web3 = await connectWeb3();
    const contract = new web3.eth.Contract(crowdfundingTx, crowdfundingAddress);

    console.log("Fetching data for campaign ID:", campaignId);

    let contributors, contributions;

    try {
      contributors = await contract.methods.getContributors(campaignId).call();
      console.log("Contributors:", contributors);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      contributors = [];
    }

    try {
      contributions = await contract.methods.getContributions(campaignId).call();
      console.log("Contributions:", contributions);
    } catch (error) {
      console.error("Error fetching contributions:", error);
      contributions = [];
    }

    if (contributors.length === 0 || contributions.length === 0) {
      return { contributors: [], contributions: [], transactionHashes: [] };
    }

    const transactionHashes = await Promise.all(
      contributors.map(async (contributor, index) => {
        try {
          const events = await contract.getPastEvents('ContributionMade', {
            filter: { campaignId, contributor },
            fromBlock: 0,
            toBlock: 'latest'
          });
          console.log(`Events for contributor ${contributor}:`, events);
          return events[events.length - 1]?.transactionHash || '';
        } catch (error) {
          console.error("Error fetching transaction hash:", error);
          return '';
        }
      })
    );

    console.log("Transaction hashes:", transactionHashes);

    return { contributors, contributions, transactionHashes };
  } catch (error) {
    console.error("Error in fetchingTransaction:", error);
    throw error;
  }
};
