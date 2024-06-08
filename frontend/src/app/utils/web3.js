import Web3 from "web3";

let web3;

const setInfuraSepoliaNetwork = async () => {
    const networkName = "Sepolia Sturan Network"; // Name of the network to set
    const rpcUrls = process.env.INFURA_API_KEY; // Infura Sepolia RPC URL

    try {
        await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0xaa36a7", // Network ID, use the correct ID
                    chainName: networkName,
                    nativeCurrency: {
                        name: "SepoliaETH", // Network currency name
                        symbol: "SETH", // Network currency symbol
                        decimals: 18,
                    },
                    rpcUrl: [rpcUrls],
                    blockExplorerUrls: ["https://sepolia.etherscan.io/"], // Network block explorer URL
                },
            ],
        });
    } catch (error) {
        console.error("Failed to set network in MetaMask:", error);
    }
};

export const connectWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
        if (window.ethereum) {
            try {
                await setInfuraSepoliaNetwork();
                await window.ethereum.request({ method: "eth_requestAccounts" });
                web3 = new Web3(window.ethereum);
                resolve(web3);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
                reject(error);
            }
        } else {
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

export { web3 };
