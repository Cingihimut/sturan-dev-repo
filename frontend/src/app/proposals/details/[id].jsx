"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCampaignDetails } from '@/app/utils/contract';
import Image from 'next/image';
import SideBarReward from "@/components/SideBarReward";

const CampaignDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if (id) {
          const campaignDetail = await getCampaignDetails(id);
          setCampaign(campaignDetail);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching campaign details", error);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div className="min-h-screen bg-opacity-10 p-4 md:p-6 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="col-span-1 lg:col-span-3 pr-0 lg:pr-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl lg:text-2xl font-semibold">{campaign.name}</h1>
            <button className="py-2 px-4 lg:px-6 border-[2px] border-color-neutral rounded-full">Share</button>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Palestine Need Your Hand, help us for humanity🌎</h1>
            <div className="flex gap-2 lg:gap-4 mt-3 flex-wrap">
              <p className={`border-[2px] p-1 lg:p-2 ${campaign.isOpen ? 'border-color-green bg-color-green bg-opacity-25' : 'border-color-red bg-color-red bg-opacity-25'} rounded-full`}>
                {campaign.isOpen ? 'Ongoing' : 'Closed'}
              </p>
              <p className="border-[2px] p-1 lg:p-2 border-color-green rounded-full bg-color-green bg-opacity-25">
                {new Date(Number(campaign.startTime) * 1000).toLocaleDateString()} ~ {new Date(Number(campaign.endTime) * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-6 lg:mt-12">
            <h1 className="font-semibold text-2xl lg:text-3xl">Article</h1>
            <p className="mt-2 lg:mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus voluptate nulla voluptatum suscipit eaque, at nesciunt asperiores deleniti culpa nobis odit, ullam eum, accusantium assumenda quaerat necessitatibus! Iste, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi tempora esse inventore nemo temporibus ipsa. Quaerat similique suscipit tenetur excepturi nam illo voluptatibus soluta, deleniti omnis aspernatur blanditiis sunt consequatur?</p>
            <div className="flex justify-center items-center mt-4">
              <Image src="/assets/dummy-foto.png" height="400" width="400" alt="..." className="w-full h-auto" />
            </div>
            <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus voluptate nulla voluptatum suscipit eaque, at nesciunt asperiores deleniti culpa nobis odit, ullam eum, accusantium assumenda quaerat necessitatibus! Iste, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi tempora esse inventore nemo temporibus ipsa. Quaerat similique suscipit tenetur excepturi nam illo voluptatibus soluta, deleniti omnis aspernatur blanditiis sunt consequatur?</p>
            <p className="mt-2 lg:mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus voluptate nulla voluptatum suscipit eaque, at nesciunt asperiores deleniti culpa nobis odit, ullam eum, accusantium assumenda quaerat necessitatibus! Iste, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi tempora esse inventore nemo temporibus ipsa. Quaerat similique suscipit tenetur excepturi nam illo voluptatibus soluta, deleniti omnis aspernatur blanditiis sunt consequatur?</p>
          </div>
          <h1 className="mt-7 text-xl lg:text-2xl font-semibold">Explore</h1>
        </div>
        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-color-neutral col-span-1 lg:col-span-2 pt-4 lg:pt-0">
          <SideBarReward />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
