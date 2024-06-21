import contractAbi from "../../contracts/Crowdfunding.json";
import { connectWeb3 } from "./web3";
import Web3 from "web3";

const crowdfundingTx = contractAbi.abi;
const crowdfundingAddress = "0x95B29d870fB5F43e1DC99278343e28248A170708";

export const fetchingTransaction = async () => {
    try {
        const web3 = await connectWeb3();
        const contract = new web3.eth.Contract(crowdfundingTx, crowdfundingAddress);
        const contributorsData = await contract.methods.getContributors().call();
        const contributors = contributorsData[0].map((address) => Web3.utils.toChecksumAddress(address));
        const contributions = contributorsData[1].map((value) => Web3.utils.fromWei(value, "ether"));
        console.log("Fetch tx", contributorsData);
        console.log("Contributors:", contributors);
        console.log("Contribution Value:", contributions);
        return [contributors, contributions];
    } catch (error) {
        console.error("Error fetching contributors", error);
        return null;
    }
};