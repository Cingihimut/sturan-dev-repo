import { connectWeb3 } from "./web3";
import Web3 from "web3";
import contractABI from "../../contracts/CrowdfundingModule#Crowdfunding.json";

const web3 = new Web3();
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

export const createContractInstance = async() => {
    try {
        const contract = new web3.eth.Contract(
            contractABI.abi,
            "0x607821e22c28c59AB60EFA165f62B02147d12D70" //contract intance
        );

        return contract;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getContributors = async() =>{
    try {
        const contract = await createContractInstance();
        if (!contract) {
            throw new Error("Failed to create contract instance");
        }

        const contributors = await contract.methods.getContributors().call();
        const contributions = {};

        for (let i = 0; i < contributors.length; i++) {
            const contributor = contributors[i];
            const contribution = await contract.methods.contributions(contributor).call();
            contributions[contributor] = Number(contribution);
        }

        console.log("Contributions Fetched:", contributions);
        return contributions;
        
    } catch (error) {
        console.error("Error fetching contributions", error);
        return {};
    }
};
