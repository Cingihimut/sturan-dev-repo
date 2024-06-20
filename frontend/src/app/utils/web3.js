import Web3 from "web3";

let web3;

const setInfuraSepoliaNetwork = async () => {
    const networkName = "Sepolia Sturan Network";
    const rpcUrls = process.env.INFURA_API_KEY;

    try {
        await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0xaa36a7", // ID jaringan Sepolia
                    chainName: networkName,
                    nativeCurrency: {
                        name: "SepoliaETH",
                        symbol: "SETH",
                        decimals: 18,
                    },
                    rpcUrls: [rpcUrls],
                    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
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
            params: [{ chainId: "0xaa36a7" }], // ID jaringan Sepolia
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            // Jaringan belum ditambahkan ke MetaMask
            await setInfuraSepoliaNetwork();
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
    const sepoliaNetworkId = "0xaa36a7"; // ID jaringan Sepolia
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
