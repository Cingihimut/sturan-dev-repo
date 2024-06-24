import Web3 from "web3";
import { connectWeb3 } from "./web3";
import claimTokenABI from "../../contracts/ClaimToken.json";
const claimXTR = claimTokenABI.abi;
const claimTokenAddress = "0x6a2111c4f45973e236F5113d126b1cEb2baBcC09";

export const claimToken = async() => {
    try {
        const web3 = await connectWeb3();
        const contract = new web3.eth.Contract(claimXTR, claimTokenAddress);
        const accounts = await web3.eth.getAccounts();
        
        const claimFee = web3.utils.toWei('0.00009', 'ether');

        const tx = await contract.methods.claimXTR().send({ 
            from: accounts[0],
            value: claimFee
        });

        console.log("Success", tx);
    } catch (error) {
        console.log("Error", error);
    }
}
