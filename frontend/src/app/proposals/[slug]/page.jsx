"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SideBarReward from "../../../components/SideBarReward";
import { Checks } from "@phosphor-icons/react";
import { SocialIcon } from "react-social-icons";
import { useFetchCampaigns } from "../../utils/contract";

const CampaignDetail = ({ params }) => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { slug } = params;

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const campaignDetails = await useFetchCampaigns(Number(slug));
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

  const handleShareClick = (platform) => {
    const campaignLink = window.location.href;
    if (platform === "x") {
      window.open(`https://twitter.com/intent/tweet?text=Check%20out%20this%20campaign!&url=${campaignLink}`, '_blank');
    } else if (platform === "copy") {
      navigator.clipboard.writeText(campaignLink).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch((error) => {
        console.error("Error copying link to clipboard", error);
      });
    }
  };

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
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="py-2 px-4 lg:px-6 border-[2px] border-color-neutral rounded-full">
                Share
              </button>
              {showDropdown && (
                <div className="absolute top-full mt-1 bg-white border-[2px] border-color-gray rounded shadow-lg">
                  <ul className="py-2 px-4">
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleShareClick("x")}
                    >
                      <SocialIcon target="_blank" style={{ height:25, width: 25 }} url="https://x.com"/>
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleShareClick("copy")}
                    >
                      {copySuccess ? <Checks size={32} />: 'Copy'}
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Link target="_blank" className="py-2 px-4 lg:px-6 border-[2px] border-color-neutral rounded-full" href="https://testnets.opensea.io/collection/palestine-need-you-campaign/overview">
              Store
            </Link>
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
            <p className="mt-2 lg:mt-4">{campaign.description || "No description available."}</p>
            <div className="flex justify-center items-center mt-4">
              <Image src="/assets/dummy-foto.png" height="400" width="400" alt="Campaign image" className="w-full h-auto" />
            </div>
          </div>
          <h1 className="mt-7 text-xl lg:text-2xl font-semibold">Explore</h1>
        </div>
        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-color-neutral col-span-1 lg:col-span-2 pt-4 lg:pt-0">
          <SideBarReward campaignId={Number(slug)} />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;