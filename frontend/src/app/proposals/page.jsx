"use client";
import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 5;
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleNextPage = () => {
    if ((currentPage + 1) * cardsPerPage < campaigns.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        setIsAnimating(false);
      }, 300); // Durasi animasi 300ms
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage - 1);
        setIsAnimating(false);
      }, 300); // Durasi animasi 300ms
    }
  };

  const paginatedCampaigns = campaigns.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-color-white">
      <div className="overflow-hidden">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 transition-transform duration-300 ease-in-out ${
            isAnimating ? "transform translate-x-[-100%]" : "transform translate-x-0"
          }`}
        >
          {paginatedCampaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/proposals/${campaign.id}`}
              className="bg-[#303339] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
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
                <div className="p-2">
                  <div className="flex justify-between items-center mb-1.5">
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
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * cardsPerPage >= campaigns.length}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Participate;
