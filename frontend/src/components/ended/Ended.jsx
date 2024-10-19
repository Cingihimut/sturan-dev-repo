"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatUnits } from "ethers/lib/utils";

const Ended = ({ campaigns }) => {
  const [closedCampaigns, setClosedCampaigns] = useState([]);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
    const filteredCampaigns = campaigns.filter(
      (campaign) => Number(campaign.endTime) < now && !campaign.isOpen
    );
    setClosedCampaigns(filteredCampaigns);
  }, [campaigns]);

  const formatGoal = (goal) => {
    return parseFloat(formatUnits(goal, 18)).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-color-white">
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {closedCampaigns.length > 0 ? (
            closedCampaigns.map((campaign, index) => (
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
                        {formatGoal(campaign.goal)} USDCS
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
                        className={`text-[10px] px-1.5 py-0.5 rounded-full bg-red-900/30 text-red-400 border border-red-400`}
                      >
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No closed campaigns found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ended;
