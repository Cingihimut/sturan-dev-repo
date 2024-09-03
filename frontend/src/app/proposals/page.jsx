"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCampaigns } from '../utils/ethers';

const Participate = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignList = await getCampaigns();
        setCampaigns(campaignList);
      } catch (error) {
        console.error("Error fetching campaigns", error);
      }
    };

    fetchCampaigns();
  }, []);

  const formatGoal = (goal) => {
    const goalInEther = Number(goal) / 1e18; // Convert from wei to ether
    return goalInEther.toLocaleString(); // Format with commas as thousand separators
  };

  return (
    <div className="p-4 sm:p-6 md:p-9">
      <h1 className="text-xl sm:text-2xl font-bold">Hot 🔥</h1>
      <div className="mt-4 flex flex-wrap gap-5 justify-center">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/proposals/${campaign.id}`}>
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
                <h1 className="font-semibold text-center sm:text-left">{campaign.name}</h1>
                <p className="text-center sm:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
                  <h1 className="mt-2">Deadline</h1>
                  <h1 className="mt-2">Goals</h1>
                  <p className="mt-2">{new Date(Number(campaign.endTime) * 1000).toLocaleDateString()}</p>
                  <p className="text-color-neutral mt-2">{formatGoal(campaign.goal)} USDCS</p>
                </div>
                <p className={`mt-2 p-2 ${campaign.isOpen ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'} rounded-full text-center`}>
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