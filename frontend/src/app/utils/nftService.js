import { connectWeb3 } from "./web3";
import nftAbi from "../../contracts/NftSturanNetwork.json";

const nftAddress = "0x2A5D0503d9f94002C49025e93DD147aAde4657ac";

export const createNftInstance = async () => {
  const web3 = await connectWeb3();
  return new web3.eth.Contract(nftAbi.abi, nftAddress);
};

export const mintNftCampaign = async ({ campaignId, amount, data, uri }) => {
  try {
    const web3 = await connectWeb3();
    const accounts = await web3.eth.getAccounts();
    const ownerAddress = accounts[0];
    const nftInstance = await createNftInstance();
    const formattedData = web3.utils.asciiToHex(data);

    const transaction = await nftInstance.methods.mintToOwner(campaignId, amount, formattedData, uri).send({
      from: ownerAddress,
      gas: 1000000,
      gasPrice: web3.utils.toWei('31.554641306', 'gwei')
    });

    console.log("NFT minted successfully", transaction);
    return transaction;
  } catch (error) {
    console.error("Error minting NFT", error);
    throw error;
  }
};

export const claimNft = async (campaignId, amount) => {
  try {
    const web3 = await connectWeb3();
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const nftInstance = await createNftInstance();

    const transaction = await nftInstance.methods
      .claimNft(campaignId, amount)
      .send({ from: userAddress });

    console.log("NFT claimed successfully", transaction);
    return transaction;
  } catch (error) {
    console.error("Error claiming NFT", error);
    throw error;
  }
};

export const setUri = async (newUri) => {
  try {
    const web3 = await connectWeb3();
    const accounts = await web3.eth.getAccounts();
    const ownerAddress = accounts[0];
    const nftInstance = await createNftInstance();

    const transaction = await nftInstance.methods
      .setUri(newUri)
      .send({ from: ownerAddress });

    console.log("URI set successfully", transaction);
    return transaction;
  } catch (error) {
    console.error("Error setting URI", error);
    throw error;
  }
};

export const getTokenUri = async (tokenId) => {
  try {
    const nftInstance = await createNftInstance();
    const uri = await nftInstance.methods.uri(tokenId).call();
    return uri;
  } catch (error) {
    console.error("Error getting token URI", error);
    throw error;
  }
};