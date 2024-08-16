import { connectWeb3 } from "./web3";
import Web3 from "web3";
import crowdfundingABI from "../../contracts/Crowdfunding.json";

const contractAddress = "0x080140434c2a4198F73bEA2829347521340e31cf";

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

export const getTokenBalance = async(account, contractAbi, contractAddress) => {
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

export const createContractInstance = async() => {
    const web3 = await connectWeb3();
    return new web3.eth.Contract(crowdfundingABI.abi, contractAddress);
};

export const getCampaigns = async () => {
    try {
        const contract = await createContractInstance();
        const campaignCount = await contract.methods.getCampaignCount().call();
        const campaigns = [];

        for (let i = 0; i < campaignCount; i++) {
            const campaign = await contract.methods.campaigns(i).call();
            campaigns.push({
                id: i,
                name: campaign.name,
                goal: campaign.goal,
                maxContribution: campaign.maxContribution,
                maxContributor: campaign.maxContributor,
                duration: campaign.duration,
                startTime: campaign.startTime,
                endTime: campaign.endTime,
                isOpen: campaign.isOpen,
                contributors: campaign.contributors,
                contributions: campaign.contributions
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
        const contract = await createContractInstance();
        const accounts = await web3Instance.eth.getAccounts();

        await contract.methods.addCampaign(name, goal, maxContribution, maxContributor, duration)
            .send({ from: accounts[0] });
    } catch (error) {
        console.error("Error creating campaign", error);
        throw error;
    }
};


export const getCampaignDetails = async (campaignId) => {
    try {
        const contract = await createContractInstance();
        const campaign = await contract.methods.campaigns(campaignId).call();
    
        return {
            id: campaignId,
            name: campaign.name,
            goal: BigInt(campaign.goal),
            maxContribution: BigInt(campaign.maxContribution),
            maxContributor: Number(campaign.maxContributor),
            duration: campaign.duration,
            startTime: campaign.startTime,
            endTime: campaign.endTime,
            isOpen: campaign.isOpen,
            contributors: campaign.contributors,
            contributions: campaign.contributions
        };
    } catch (error) {
        console.error("Error fetching campaign details", error);
        throw error;
    }
};

export const getContributorStatus = async (account) => {
    try {
        const contract = await createContractInstance();
        const [isContributor, campaignId] = await contract.methods.getContributorStatus(account).call();
        return { isContributor, campaignId };
    } catch (error) {
        console.error("Error checking contributor status", error);
        throw error;
    }
};