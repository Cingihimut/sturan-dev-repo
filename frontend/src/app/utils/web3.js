import Web3 from "web3";
import contractAbi from "../../contracts/Crowdfunding.json"
import { createContractInstance } from "./contract";

let web3;
const contractAddress = "0x080140434c2a4198F73bEA2829347521340e31cf";

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
    const sepoliaNetworkId = "0x14a34"; // ID jaringan Sepolia
    if (networkId === sepoliaNetworkId) {
        window.location.reload(); // Reload page when network is changed to Sepolia
    }
};

export const connectWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                web3 = new Web3(window.ethereum);
                
                // Add event listener for network changes
                window.ethereum.on('chainChanged', handleNetworkChanged);

                await checkNetwork(); // Check and set the correct network
                resolve(web3);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
                reject(error);
            }
        } else {
            const provider = web3.providers.HttpProvider("https://sturan-equity-crowdfunding.vercel.app/");
            reject(new Error("Please use MetaMask to connect."));
        }
    });
};

export const getWeb3 = () => {
    if (!web3) {
        throw new Error("Web3 is not connected. Please connect MetaMask first.");
    }
    return web3;
};

export const isOwner = async(account) => {
    try {
        const web3Instance = createContractInstance();
        const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
        const owner = await contract.methods.owner().call();
        return owner.toLowerCase() === account.toLowerCase();
    } catch (error) {
        console.error("Error checking status", error);
        throw error
    }
}

export const disconnectWeb3 = () => {
    web3 = null;
};

export { web3 };
