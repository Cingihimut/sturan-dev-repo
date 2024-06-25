import { connectWeb3 } from "./web3";
import nftAbi from "../../contracts/NftSturanNetwork.json";

const nftAddress = "0x2A5D0503d9f94002C49025e93DD147aAde4657ac";

export const createNftInstance = async () => {
  const web3 = await connectWeb3();
  return new web3.eth.Contract(nftAbi.abi, nftAddress);
};

export const mintNftCampaign = async ({ campaignId, amount, data, uri }) => {
  try {
    const contract = await createNftInstance();
    const web3 = await connectWeb3();
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    const campaignIdBN = web3.utils.toNumber(campaignId);
    const amountBN = web3.utils.toNumber(amount);
    
    const validData = data === '0x' ? data : web3.utils.asciiToHex(data);

    const receipt = await contract.methods.mintToOwner(campaignIdBN, amountBN, validData, uri).send({ from: sender });
    console.log("Transaction receipt", receipt);
    return receipt;
  } catch (error) {
    console.error("Error mint nft to campaign", error);
    throw error;
  }
};

export const claimNft = async (campaignId, amount) => {
  const nft = await createNftInstance();
  const accounts = await connectWeb3();
  const from = accounts[0];

  await nft.methods.claimNft(campaignId, amount).send({ from });
};

export const setUri = async (newUri) => {
  const nft = await createNftInstance();
  const accounts = await connectWeb3();
  const from = accounts[0];

  await nft.methods.setUri(newUri).send({ from });
};

export const getTokenUri = async (tokenId) => {
  const nft = await createNftInstance();
  return await nft.methods.uri(tokenId).call();
};
