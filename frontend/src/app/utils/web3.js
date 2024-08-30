import Web3 from "web3";
import contractAbi from "../../contracts/Crowdfunding.json"
import { createContractInstance } from "./contract";

let web3;
const contractAddress = "0xB2C43b544E321c04B83E1F6268779e1cD9e1c1B4";

const setBaseRpcUrl = async () => {
    const networkName = "Sepolia Sturan Network";
    const rpcUrls = "https://base-sepolia-rpc.publicnode.com";

    try {
        await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0x14a34", // ID jaringan Sepolia base
                    chainName: networkName,
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "ETH",
                        decimals: 18,
                    },
                    rpcUrls: [rpcUrls],
                    blockExplorerUrls: ["https://sepolia.base.org/"],
                },
            ],
        });
    } catch (error) {
        console.error("Failed to set network in MetaMask:", error);
    }
};

const switchToSepoliaNetwork = async () => {
    try {
        await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x14a34" }], // ID jaringan Sepolia
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            // Jaringan belum ditambahkan ke MetaMask
            await setBaseRpcUrl();
        } else {
            console.error("Failed to switch network in MetaMask:", switchError);
        }
    }
};

const checkNetwork = async () => {
    const networkId = await web3.eth.net.getId();
    const sepoliaNetworkId = 11155111; // ID jaringan Sepolia

    if (networkId !== sepoliaNetworkId) {
        await switchToSepoliaNetwork();
    }
};

const handleNetworkChanged = (networkId) => {
    const sepoliaNetworkId = "0x14a34";
    if (networkId === sepoliaNetworkId) {
        window.location.reload();
    }
};

export const getWeb3 = () => {
    if (!web3) {
        throw new Error("Web3 is not connected. Please connect MetaMask first.");
    }
    return web3;
};

export { web3 };
