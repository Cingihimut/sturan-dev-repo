import { useAccount, usePrepareTransactionRequest, useReadContract, useWriteContract } from 'wagmi';
import { Abi, parseUnits } from 'viem';
import Crowdfunding from "../../contracts/Crowdfunding.json";
import Usdcs from "../../contracts/Usdcs.json";

const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";
const USDCS_CONTRACT_ADDRESS = "0x57c58d1869e9c354683C2477759402ba7Cb99043";

export const useIsOwner = () => {
  const { address } = useAccount();
  const { data: ownerAddress, isLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'owner',
  });

  if (isLoading || !ownerAddress) {
    return false;
  }
  return (ownerAddress as string).toLowerCase() === address?.toLowerCase();
};

export const useCreateCampaign = () => {
  const { writeContract, isLoading, isSuccess, error } = useWriteContract();

  const createCampaign = async (name: string, goal: string, maxContributor: string, maxContribution: string, endTime: string) => {
    const goalInWei = parseUnits(goal, 18);
    const maxContributionInWei = parseUnits(maxContribution, 18);
    const endTimeInSeconds = Math.floor(new Date(endTime).getTime() / 1000);

    await writeContract({
      abi: Crowdfunding.abi as Abi,
      address: CROWDFUNDING_CONTRACT_ADDRESS,
      functionName: 'addCampaign',
      args: [name, goalInWei, BigInt(maxContributor), maxContributionInWei, BigInt(endTimeInSeconds)],
    });
  };

  return { createCampaign, isLoading, isSuccess, error };
};

export const useFetchCampaigns = () => {
  const { data: campaignCount, isLoading: isCountLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignCount',
  });

  const { data: campaignDetails, isLoading: isDetailsLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignDetails',
    args: [0],
  });

  return { campaignCount, isCountLoading, campaignDetails, isDetailsLoading };
};

export const useFetchCampaignById = (campaignId: number) => {
  const { data: campaignDetails, isLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignDetails',
    args: [BigInt(campaignId)],
  });

  return { campaignDetails, isLoading };
};

export const useFetchContributors = (campaignId: number) => {
  const { data: contributors, isLoading } = useReadContract({
    abi: Crowdfunding.abi as Abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: "getContributorStatus",
    args: [BigInt(campaignId)]
  })
  return { contributors, isLoading }
}

export const useApproveToken = (spender: string, amount: string) => {
  const { config, error } = usePrepareTransactionRequest({
    address: USDCS_CONTRACT_ADDRESS,
    abi: Usdcs.abi,
    functionName: "approve",
    args: [spender, parseUnits(amount || '0', 18)],
  });

  const { write: approve, isLoading: isApproving, isSuccess: isApproveSuccess, error: writeError } = useWriteContract(config);

  return { approve, isApproving, isApproveSuccess, error: error || writeError };
};

export const useTransferToken = (to: string, amount: string) => {
  const { config, error } = usePrepareTransactionRequest({
    address: USDCS_CONTRACT_ADDRESS,
    abi: Usdcs.abi,
    functionName: "transfer",
    args: [to, parseUnits(amount || '0', 18)],
  });

  const { write: transfer, isLoading: isTransferring, isSuccess: isTransferSuccess, error: writeError } = useWriteContract(config);

  return { transfer, isTransferring, isTransferSuccess, error: error || writeError };
};