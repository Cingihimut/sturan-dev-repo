import { connectWeb3 } from "@/app/utils/web3";
import Web3 from "web3";
import contractABI from "../../contracts/Crowdfunding.json";

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
        const web3 = await connectWeb3();

        const contract = new web3.eth.Contract(
            contractABI.abi,
            "0x1BB16F49706853283eC79EF8C4Bf27e72E64D9A3"
        );
        return contract
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const contractIstanceDeltaVenturesFund = async()=> {
    try {
        const web3 = await connectWeb3();
        const contract = new web3.eth.Contract(deltaVenturesAbi.abi, "0x56E8561E577716585FCa7f90a60EE1856f9210AB");
        return contract;
    } catch (error) {
        console.log(error);
        return null;
    }
}
