"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetCampaignCount, useGetCampaignDetails } from "../../app/utils/contract";
import { formatUnits } from 'viem';

const SuccessCampaign = () => {
  const [closedCampaigns, setClosedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClosedCampaigns = async () => {
      try {
        setLoading(true);
        const count = await useGetCampaignCount();
        const campaignPromises = [];
        for (let i = 0; i < Number(count); i++) {
          campaignPromises.push(useGetCampaignDetails(i));
        }
        const campaignData = await Promise.all(campaignPromises);
        const closedList = campaignData.filter(campaign => !campaign[7]); // campaign[7] is isOpen
        setClosedCampaigns(closedList);
      } catch (error) {
        console.error("Error fetching campaigns", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClosedCampaigns();
  }, []);

  const formatGoal = (goal) => {
    return formatUnits(goal, 18);
  };

  if (loading) {
    return <p>Loading closed campaigns...</p>;
  }

  return (
    <div className="p-16">
      <h1 className="text-2xl font-bold">Campaign End</h1>
      <div className="mt-4 flex flex-wrap gap-5 justify-center">
        {closedCampaigns.map((campaign, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/proposals/${index}`}>
              <div className="flex flex-col h-full">
                <div className="flex justify-center">
                  <Image
                    src="/assets/dummy-member.jpeg"
                    height="250"
                    width="250"
                    alt="..."
                    className="p-4"
                  />
                </div>
                <h1 className="font-semibold text-center sm:text-left">{campaign[0]}</h1>
                <p className="text-center sm:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
                  <h1 className="mt-2">Deadline</h1>
                  <h1 className="mt-2">Goals</h1>
                  <p className="mt-2">{new Date(Number(campaign[6]) * 1000).toLocaleDateString()}</p>
                  <p className="text-color-neutral mt-2">{formatGoal(campaign[1])} USDCS</p>
                </div>
                <p className="mt-2 p-2 bg-red-100 border-2 border-red-500 rounded-full text-center">
                  Closed
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessCampaign;