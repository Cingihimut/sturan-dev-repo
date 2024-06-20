import { connectWeb3 } from "@/app/utils/web3";
import Web3 from "web3";
import contractABI from "../../contracts/Crowdfunding.json";

const contractAddress = "0x95B29d870fB5F43e1DC99278343e28248A170708";

export const getConnectedAccount = async () => {
    try {
        const web3Instance = await connectWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
            return accounts[0];
        }
        throw new Error("No accounts found");
    } catch (error) {
        console.error("Error getting connected account", error);
        throw error;
    }
};

export const getTokenBalance = async (account, contractAbi, contractAddress) => {
    try {
        const web3Instance = await connectWeb3();
        const contract = new web3Instance.eth.Contract(contractAbi, contractAddress);
        const balance = await contract.methods.balanceOf(account).call();
        return Number(balance);
    } catch (error) {
        console.error("Error getting token balance", error);
        throw error;
    }
};

export const createContractInstance = async () => {
    const web3 = await connectWeb3();
    return new web3.eth.Contract(contractABI.abi, contractAddress);
};

export const getCampaigns = async () => {
    try {
        const contract = await createContractInstance();
        const campaignCount = await contract.methods.getCampaignCount().call();
        const campaigns = [];

        for (let i = 0; i < campaignCount; i++) {
            const campaign = await contract.methods.getCampaignById(i).call();
            campaigns.push({
                id: campaign[0],
                name: campaign[1],
                goal: campaign[2],
                maxContribution: campaign[3],
                maxContributor: campaign[4],
                duration: campaign[5],
                startTime: campaign[6],
                endTime: campaign[7],
                isOpen: campaign[8],
                contributors: campaign[9],
                contributions: campaign[10]
            });
        }

        return campaigns;
    } catch (error) {
        console.error("Error fetching campaigns", error);
        return [];
    }
};

export const createCampaign = async (name, goal, maxContribution, maxContributor, duration) => {
    try {
        const web3Instance = await connectWeb3();
        const contract = new web3Instance.eth.Contract(contractABI.abi, contractAddress);
        const accounts = await web3Instance.eth.getAccounts();

        if (!contract.methods.addCampaign) {
            throw new Error("Method addCampaign not found on contract");
        }

        await contract.methods.addCampaign(name, goal, maxContribution, maxContributor, duration).send({ from: accounts[0] });
    } catch (error) {
        console.error("Error creating campaign", error);
        throw error;
    }
};

export const getCampaignDetails = async (campaignId) => {
    try {
        const contract = await createContractInstance();
        const campaign = await contract.methods.getCampaignDetails(campaignId).call();

        return{
            id: campaignId,
            name: campaign[0],
            goal: campaign[1],
            maxContribution: campaign[2],
            maxContributor: campaign[3],
            duration: campaign[4],
            startTime: campaign[5],
            endTime: campaign[6],
            isOpen: campaign[7]
        }
    } catch (error) {
        console.error("Error fetching campaign details", error);
        throw error;
    }
}