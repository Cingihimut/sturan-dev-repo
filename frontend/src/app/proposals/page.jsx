"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFetchCampaigns } from '../utils/contract';
import { useReadContract } from 'wagmi';
import Crowdfunding from "../../contracts/Crowdfunding.json";
import { formatUnits } from 'ethers/lib/utils';

const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";

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
          goal: formatUnits(campaignDetails[1], 18),
          maxContribution: formatUnits(campaignDetails[2], 18),
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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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
                    alt="Campaign image"
                    className="p-4"
                  />
                </div>
                <h1 className="font-semibold text-center sm:text-left">{campaign.name || 'Unnamed Campaign'}</h1>
                <p className="text-center sm:text-left">Goal: {formatCurrency(campaign.goal)} USD$</p>
                <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
                  <h1 className="mt-2">Start Time</h1>
                  <h1 className="mt-2">End Time</h1>
                  <p className="mt-2">{formatDate(campaign.startTime)}</p>
                  <p className="mt-2">{formatDate(campaign.endTime)}</p>
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