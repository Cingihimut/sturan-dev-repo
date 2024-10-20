import { 
  useAccount, 
  useBalance, 
  useReadContract, 
  useSimulateContract, 
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi';
import { Abi, parseEther, parseUnits } from 'viem';
import Crowdfunding from "../../contracts/Crowdfunding.json";
import Usdcs from "../../contracts/Usdcs.json";
import { config } from '../../../config';
import { useEffect } from 'react';

// Pastikan address dalam format yang benar
const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F" as const;
const USDCS_CONTRACT_ADDRESS = "0x57c58d1869e9c354683C2477759402ba7Cb99043" as const;

export const useIsOwner = () => {
  const { address, chain } = useAccount();
  const { data: ownerAddress, isLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'owner',
    chainId: chain?.id
  });

  if (isLoading || !ownerAddress) {
    return false;
  }
  return (ownerAddress as string).toLowerCase() === address?.toLowerCase();
};

export const useFetchCampaigns = () => {
  const { address, chain } = useAccount();
  
  const { data: campaignCount, isLoading: isCountLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignCount',
    chainId: chain?.id,
    account: address
  });

  const { data: campaignDetails, isLoading: isDetailsLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignDetails',
    args: [BigInt(0)],
    chainId: chain?.id,
    account: address
  });

  return { campaignCount, isCountLoading, campaignDetails, isDetailsLoading };
};

export const useFetchCampaignById = (campaignId: number) => {
  const { address, chain } = useAccount();
  
  const { data: campaignDetails, isLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignDetails',
    args: [BigInt(campaignId)],
    chainId: chain?.id,
    account: address
  });

  return { campaignDetails, isLoading };
};

export const useFetchContributors = (campaignId: number) => {
  const { address, chain } = useAccount();
  
  const { data: contributors, isLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: "getContributorStatus",
    args: [BigInt(campaignId)],
    chainId: chain?.id,
    account: address
  });
  
  return { contributors, isLoading };
};

export const useApproveAndTransferToken = (spenderAddress: string, amount: string) => {
  const { address, chain } = useAccount();
  const { writeContract: writeApprove } = useWriteContract();
  const { writeContract: writeTransfer } = useWriteContract();

  const approve = async () => {
    if (!address || !chain?.id) return;
    
    const amountInWei = parseUnits(amount, 18);
    
    try {
      await writeApprove({
        abi: Usdcs.abi as Abi,
        address: USDCS_CONTRACT_ADDRESS,
        functionName: 'approve',
        args: [spenderAddress, amountInWei],
        chainId: chain.id,
        account: address
      });
    } catch (err) {
      console.error('Error approving tokens:', err);
    }
  };

  const transfer = async () => {
    if (!address || !chain?.id) return;
    
    const amountInWei = parseUnits(amount, 18);
    
    try {
      await writeTransfer({
        abi: Usdcs.abi as Abi,
        address: USDCS_CONTRACT_ADDRESS,
        functionName: 'transfer',
        args: [spenderAddress, amountInWei],
        chainId: chain.id,
        account: address
      });
    } catch (err) {
      console.error('Error transferring tokens:', err);
    }
  };

  return { approve, transfer };
};