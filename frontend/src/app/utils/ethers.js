import { useAccount, useContractWrite, useReadContract } from 'wagmi';
// import { account, publicClient, walletClient } from "../../config/config"
import { parseUnits } from 'viem';
import CrowdfundingABI from "../../contracts/Crowdfunding.json";
import UsdcsABI from "../../contracts/usdcs.json";

const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";
const USDCS_CONTRACT_ADDRESS = "0x57c58d1869e9c354683C2477759402ba7Cb99043";

// Mengambil contract crowdfunding dengan wagmi
export const useCrowdfundingContract = () => {
  return useReadContract({
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    abi: CrowdfundingABI.abi,
  });
};

export const useIsOwner = () => {
  const { address } = useAccount();
  const { data: ownerAddress, isLoading } = useReadContract({
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    abi: CrowdfundingABI.abi,
    functionName: 'owner',
  });

  if (isLoading || !ownerAddress) {
    return false;
  }
  return ownerAddress?.toLowerCase() === address?.toLowerCase();
};

export const useCreateCampaign = async() => {
  const owner = useIsOwner();

};

// Mengambil contract token dengan wagmi
export const useTokenContract = () => {
  return useReadContract({
    address: USDCS_CONTRACT_ADDRESS,
    abi: UsdcsABI,
  });
};

// Fungsi untuk mendapatkan detail campaign
export const useGetCampaignDetails = (campaignId) => {
  return useReadContract({
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    abi: CrowdfundingABI.abi,
    functionName: 'getCampaignDetails',
    args: [BigInt(campaignId)],
  });
};

// Fungsi untuk mendapatkan jumlah campaign
export const useGetCampaignCount = () => {
  return useReadContract({
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    abi: CrowdfundingABI.abi,
    functionName: 'getCampaignCount',
  });
};
