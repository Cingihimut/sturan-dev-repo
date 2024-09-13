"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFetchCampaigns } from '../utils/contract';
import { useReadContract } from 'wagmi';
import Crowdfunding from "../../contracts/Crowdfunding.json";

const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";

// Fungsi helper untuk memformat angka besar
const formatLargeNumber = (num) => {
  if (num >= 1e18) {
    return (num / 1e18).toFixed(2) + ' Quintillion';
  } else if (num >= 1e15) {
    return (num / 1e15).toFixed(2) + ' Quadrillion';
  } else if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + ' Trillion';
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + ' Billion';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + ' Million';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + ' Thousand';
  } else {
    return num.toFixed(2);
  }
};

const Participate = () => {
  const { campaignCount, isCountLoading } = useFetchCampaigns();
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaignId, setCurrentCampaignId] = useState(0);

  const { data: campaignDetails, isLoading: isDetailsLoading } = useReadContract({
    abi: Crowdfunding.abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: 'getCampaignDetails',
    args: [currentCampaignId],
  });

  useEffect(() => {
    if (!isCountLoading && campaignCount && !isDetailsLoading && campaignDetails) {
      setCampaigns(prevCampaigns => [
        ...prevCampaigns,
        {
          id: currentCampaignId,
          name: campaignDetails[0],
          goal: campaignDetails[1],
          maxContribution: campaignDetails[2],
          maxContributor: campaignDetails[3],
          duration: campaignDetails[4],
          startTime: campaignDetails[5],
          endTime: campaignDetails[6],
          isOpen: campaignDetails[7],
        }
      ]);

      if (currentCampaignId < Number(campaignCount) - 1) {
        setCurrentCampaignId(prevId => prevId + 1);
      }
    }
  }, [campaignCount, isCountLoading, isDetailsLoading, campaignDetails, currentCampaignId]);

  if (isCountLoading || isDetailsLoading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-9">
      <h1 className="text-xl sm:text-2xl font-bold">Available Campaigns</h1>
      <div className="mt-4 flex flex-wrap gap-5 justify-center">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/proposals/${campaign.id}`}>
              <div className="flex flex-col h-full">
                <div className="flex justify-center">
                  <Image
                    src="/assets/dummy-member.jpeg"
                    height={250}
                    width={250}
                    alt="..."
                    className="p-4"
                  />
                </div>
                <h1 className="font-semibold text-center sm:text-left">{campaign.name}</h1>
                <p className="text-center sm:text-left">Goal: {formatLargeNumber(Number(campaign.goal))} USDC</p>
                <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
                  <h1 className="mt-2">Start Time</h1>
                  <h1 className="mt-2">End Time</h1>
                  <p className="mt-2">{new Date(Number(campaign.startTime) * 1000).toLocaleDateString()}</p>
                  <p className="mt-2">{new Date(Number(campaign.endTime) * 1000).toLocaleDateString()}</p>
                </div>
                <p
                  className={`mt-2 p-2 ${campaign.isOpen ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                    } rounded-full text-center`}
                >
                  {campaign.isOpen ? 'Ongoing' : 'Closed'}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participate;