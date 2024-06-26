"use client";

import { useEffect, useState } from "react";
import { getCampaignDetails } from "../../utils/contract";
import Image from "next/image";
import SideBarReward from "@/components/SideBarReward";
import Link from "next/link";

const CampaignDetail = ({ params }) => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = params;
  
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const campaignDetails = await getCampaignDetails(slug);
        setCampaign(campaignDetails);
      } catch (error) {
        console.error("Error fetching campaign details", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCampaignDetails();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!campaign) {
    return <p>No campaign found</p>;
  }

  return (
    <div className="min-h-screen bg-opacity-10 p-4 md:p-6 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="col-span-1 lg:col-span-3 pr-0 lg:pr-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl lg:text-2xl font-semibold">{campaign.name}</h1>
            <button className="py-2 px-4 lg:px-6 border-[2px] border-color-neutral rounded-full">Share</button>
            <Link target="blank" className="py-2 px-4 lg:px-6 border-[2px] border-color-neutral rounded-full" href="https://testnets.opensea.io/collection/palestine-need-you-campaign/overview">Store</Link>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl lg:text-3xl font-bold">{campaign.name}</h1>
            <div className="flex gap-2 lg:gap-4 mt-3 flex-wrap">
              <p className={`border-[2px] p-1 lg:p-2 border-color-${campaign.isOpen ? "green" : "red"} rounded-full bg-color-${campaign.isOpen ? "green" : "red"} bg-opacity-25`}>
                {campaign.isOpen ? "Ongoing" : "Closed"}
              </p>
              <p className="border-[2px] p-1 lg:p-2 border-color-green rounded-full bg-color-green bg-opacity-25">
                {new Date(Number(campaign.startTime) * 1000).toLocaleDateString()} ~ {new Date(Number(campaign.endTime) * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-6 lg:mt-12">
            <h1 className="font-semibold text-2xl lg:text-3xl">Article</h1>
            <p className="mt-2 lg:mt-4">{/* Insert campaign article or description here */}</p>
            <div className="flex justify-center items-center mt-4">
              <Image src="/assets/dummy-foto.png" height="400" width="400" alt="..." className="w-full h-auto" />
            </div>
            <p className="mt-4">{/* Insert more campaign description here */}</p>
          </div>
          <h1 className="mt-7 text-xl lg:text-2xl font-semibold">Explore</h1>
        </div>
        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-color-neutral col-span-1 lg:col-span-2 pt-4 lg:pt-0">
          <SideBarReward campaignId={slug}/>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
