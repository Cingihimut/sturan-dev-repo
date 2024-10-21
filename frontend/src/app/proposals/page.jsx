"use client";
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
  const cardWidth = 280; // Fixed card width

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

    const scrollAmount = direction === 'left' ? -cardWidth - 16 : cardWidth + 16; // Adding gap (16px) to scroll amount
    const newScrollPosition = container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-color-white">
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>

        {/* Campaign container with hidden scrollbar */}
        <div 
          ref={containerRef}
          className="overflow-x-hidden"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex space-x-4 pb-4" style={{ minWidth: 'min-content' }}>
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/proposals/${campaign.id}`}
                className="flex-none w-[280px] bg-[#303339] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col">
                  <div className="w-full h-[160px] relative">
                    <Image
                      src="/assets/dummy-member.jpeg"
                      fill
                      style={{ objectFit: "cover" }}
                      alt="Campaign image"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="font-semibold text-white text-sm truncate max-w-[150px]">
                        {campaign.name || "Unnamed Campaign"}
                      </h1>
                      <span className="text-xs text-gray-300">
                        {formatCurrency(campaign.goal)} USD
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 text-xs text-gray-400">
                        <span className="text-white">
                          {formatDate(campaign.startTime)}
                        </span>
                        <span>-</span>
                        <span className="text-white">
                          {formatDate(campaign.endTime)}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          campaign.isOpen
                            ? "bg-green-900/30 text-green-400 border border-green-400"
                            : "bg-red-900/30 text-red-400 border border-red-400"
                        }`}
                      >
                        {campaign.isOpen ? "Ongoing" : "Closed"}
                      </span>
                    </div>
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