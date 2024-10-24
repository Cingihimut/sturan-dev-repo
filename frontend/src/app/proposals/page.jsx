"use client"
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFetchCampaigns } from "../utils/contract";
import { useReadContract } from "wagmi";
import Crowdfunding from "../../contracts/Crowdfunding.json";
import { formatUnits } from "ethers/lib/utils";

const CROWDFUNDING_CONTRACT_ADDRESS = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";

const Participate = () => {
  const { campaignCount, isCountLoading } = useFetchCampaigns();
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaignId, setCurrentCampaignId] = useState(0);
  const containerRef = useRef(null);
  const cardWidth = 280;

  const { data: campaignDetails, isLoading: isDetailsLoading } = useReadContract({
    abi: Crowdfunding.abi,
    address: CROWDFUNDING_CONTRACT_ADDRESS,
    functionName: "getCampaignDetails",
    args: [currentCampaignId],
  });

  useEffect(() => {
    if (!isCountLoading && campaignCount && !isDetailsLoading && campaignDetails) {
      setCampaigns((prevCampaigns) => [
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
        },
      ]);

      if (currentCampaignId < Number(campaignCount) - 1) {
        setCurrentCampaignId((prevId) => prevId + 1);
      }
    }
  }, [campaignCount, isCountLoading, isDetailsLoading, campaignDetails, currentCampaignId]);

  if (isCountLoading || isDetailsLoading) {
    return <div>Loading campaigns...</div>;
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -cardWidth - 16 : cardWidth + 16;
    const newScrollPosition = container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          →
        </button>

        <div
          ref={containerRef}
          className="overflow-x-hidden"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex space-x-4 pb-4" style={{ minWidth: 'min-content' }}>
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/proposals/${campaign.id}`}
                className="flex-none w-[280px] bg-white rounded-lg border-[2px] border-gray-200 shadow-md overflow-hidden transform hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4">
                  {/* Project Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/assets/dummy-member.jpeg"
                        width={40}
                        height={40}
                        alt={campaign.name}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium truncate text-base">{campaign.name || "Unnamed Campaign"}</span>
                  </div>
                  <span className="text-xl font-bold">{formatCurrency(campaign.goal)} USDT</span>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    [{formatCurrency(campaign.maxContribution)}+ in rewards] {campaign.name} Official Crowdfunding
                  </p>

                  <div className="inline-flex items-center gap-1 bg-[#EBFF70] rounded-full px-3 py-1">
                    <span className="text-teal-500">₮</span>
                    <span className="text-sm font-medium">{formatCurrency(campaign.maxContribution)} USDT</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participate;
