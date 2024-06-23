import { connectWeb3 } from "./web3"
import nftAbi from "../../contracts/NftSturanNetwork.json"

const nftAddress = "0xb9Ca767368805E0B47999E233E5a307F2BA21994";

export const createNftInstance = async() => {
    const web3 = await connectWeb3()
    return new web3.eth.Contract(nftAbi.abi, nftAddress);
} 

export const mintNewNft = async ({ account, amount, _uri, data }) => {
    try {
      const contract = await createNftInstance();
      const web3 = await connectWeb3();
      const accounts = await web3.eth.getAccounts();
  
      // Validate inputs
      if (!web3.utils.isAddress(account)) {
        throw new Error("Invalid account address");
      }
      if (!Number.isInteger(amount) || amount <= 0) {
        throw new Error("Invalid NFT amount");
      }
      if (typeof _uri !== 'string' || _uri.trim() === '') {
        throw new Error("Invalid NFT URI");
      }
  
      const transaction = await contract.methods.mint(account, amount, _uri, data).send({ from: accounts[0] });
      
      return transaction;
    } catch (error) {
      console.error("Error minting NFT", error);
      throw error; // Rethrow the error to be handled in the calling function
    }
  };
  