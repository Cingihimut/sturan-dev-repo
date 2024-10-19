"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useFetchContributors } from "../app/utils/contract";
import CardSubmit from "./CardSubmit";
import Crowdfunding from "../contracts/Crowdfunding.json";
import { useReadContract, useAccount } from "wagmi";
import { formatUnits } from "viem";

const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";

const SideBarReward = ({ campaignId }) => {
  const [campaign, setCampaign] = useState(null);
  const [showCardSubmit, setShowCardSubmit] = useState(false);
  const { address } = useAccount();

  const { data: contributors, isLoading: isContributorsLoading } = useFetchContributors(campaignId);

  const { data: campaignDetails, isLoading: isDetailsLoading } = useReadContract({
    abi: Crowdfunding.abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignDetails',
    args: [BigInt(campaignId)]
  });

  useEffect(() => {
    if (!isDetailsLoading && campaignDetails) {
      setCampaign({
        id: campaignId,
        name: campaignDetails[0],
        goal: formatUnits(campaignDetails[1], 18),
        maxContribution: campaignDetails[2].toString(),
        maxContributor: formatUnits(campaignDetails[3], 18),
        duration: campaignDetails[4],
        startTime: campaignDetails[5],
        endTime: campaignDetails[6],
        isOpen: campaignDetails[7],
      });
    }
  }, [campaignId, campaignDetails, isDetailsLoading]);

  const hasContributed = useCallback(() => {
    return contributors?.includes(address);
  }, [contributors, address]);

  const handleTakePartClick = () => {
    if (!hasContributed()) {
      setShowCardSubmit(true); // Show CardSubmit
    }
  };

  const handleCloseCardSubmit = () => {
    setShowCardSubmit(false); // Hide CardSubmit
  };

  if (isDetailsLoading || isContributorsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-4 lg:p-10">
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg lg:text-xl font-semibold">Contribute here</h1>
      </div>
      <div className="border-[2px] border-color-neutral rounded-lg p-4 lg:p-7">
        {campaign && (
          <>
            <div className="flex justify-between py-2 px-3 border-[2px] border-color-neutral rounded-xl mb-4">
              <h1>For: {campaign.maxContributor?.toString() || 'N/A'} Contributors</h1>
            </div>
            <div className="flex justify-center mb-4">
              <Image src="/assets/dummy-member.jpeg" width={250} height={250} alt="Campaign image" />
            </div>
            <div className="mb-4">
              <p>Max Contribution: {campaign.maxContribution} USDCS</p>
              <p>Goals: {campaign.goal} USDCS</p>
            </div>
            <button
              onClick={handleTakePartClick}
              className={`w-full py-2 border-[2px] border-color-primary rounded-xl bg-color-primary bg-opacity-30 ${hasContributed() ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={hasContributed()}
            >
              {hasContributed() ? "THX For Your Contribution" : "Get Contribute 🔥"}
            </button>
          </>
        )}
      </div>
      <h1 className="mt-6 text-xl lg:text-2xl font-semibold">Participates:</h1>
      <div>
        {contributors && contributors.length > 0 ? (
          <ul>
            {contributors.map((contributor, index) => (
              <li key={index}>{contributor}</li>
            ))}
          </ul>
        ) : (
          <p>No contributors yet.</p>
        )}
      </div>
      {/* Show CardSubmit only if showCardSubmit is true */}
      {showCardSubmit && (
        <CardSubmit onClose={handleCloseCardSubmit} campaignId={campaignId} />
      )}
    </div>
  );
};

export default SideBarReward;
