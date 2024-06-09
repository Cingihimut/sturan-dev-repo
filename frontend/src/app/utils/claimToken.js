import Web3 from "web3";
import { connectWeb3 } from "./web3";
import claimTokenABI from "../../contracts/ClaimToken.json";
const claimXTR = claimTokenABI.abi;
const claimTokenAddress = "0x3117Ff19D2C2Abf7Ca88C2945Bde77431725E548";

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
