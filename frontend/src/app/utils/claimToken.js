import Web3 from "web3";
import { connectWeb3 } from "./web3";
import claimTokenABI from "../../contracts/ClaimToken.json";
const claimXTR = claimTokenABI.abi;
const claimTokenAddress = "0x19A0CC69c43109c72957195f9DF3889748F99245"

export const claimToken = async() => {
    try {
        const web3 = await connectWeb3();
        const contract = new web3.eth.Contract(claimXTR, claimTokenAddress);
        const accounts = await web3.eth.getAccounts();

        const tx = await contract.methods.claimXTR().send({ from: accounts[0] })

        console.log("Success", tx);
    } catch (error) {
        console.log("Error", error);
    }
}