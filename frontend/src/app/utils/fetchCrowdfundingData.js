import { createContractInstance } from "./contract";

export const fetchCrowdfundingData = async () => {
    try {
        const contract = await createContractInstance();
        const [ id, name, maxContribution, maxContributor, goal, duration, startTime, endTime, isOpen] = await contract.methods.getCampaignDetails().call();

        return {
            id,
            name,
            goal: Number(goal),
            maxContribution,
            maxContributor,
            duration,
            startTime,
            endTime,
            isOpen
        };
    } catch (error) {
        console.error("Error fetching crowdfunding data:", error);
        return null;
    }
}
