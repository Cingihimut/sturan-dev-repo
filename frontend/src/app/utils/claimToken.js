import Web3 from "web3";
import { connectWeb3 } from "./ethers";
import claimTokenABI from "../../contracts/ClaimToken.json";
const claimUsdcs = claimTokenABI.abi;
const claimTokenAddress = "0xede9E03C07BEaEc431f31CD09D473a90701bca08";

export const claimToken = async() => {
    try {
        const web3 = await connectWeb3();
        const contract = new web3.eth.Contract(claimUsdcs, claimTokenAddress);
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
