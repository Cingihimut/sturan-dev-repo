"use client";
import Image from "next/image";
import SideBarReward from "@/components/SideBarReward";
import { useState } from "react";
import Close from "@/components/alert/Close";

const Page = () => {

  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  return (
    <div className="min-h-screen bg-opacity-10">
      <div className="ml-12 grid grid-cols-5 ">
        <div className="flex-1 pr-6 col-span-3">
          <div className="flex items-center gap-32 justify-between">
            <div className="mt-12 flex justify-between items-center gap-52">
              <h1 className="text-2xl font-semibold">Badan Amal Indonesia</h1>
              <button className="py-2 px-6 border-[2px] border-color-neutral rounded-full">Share</button>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold">Palestine Need Your Hand, help us for humanity🌎</h1>
            <div className="flex gap-4 mt-3">
              <p className="border-[2px] p-1 border-color-red rounded-full bg-color-red bg-opacity-25">Pending</p>
              <p className="border-[2px] p-1 border-color-red rounded-full bg-color-red bg-opacity-25">20/6/2024 ~ 20/7/2024</p>
            </div>
          </div>
          <div className="mt-12">
            <h1 className="font-semibold text-3xl">Article</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus voluptate nulla voluptatum suscipit eaque, at nesciunt asperiores deleniti culpa nobis odit, ullam eum, accusantium assumenda quaerat necessitatibus! Iste, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi tempora esse inventore nemo temporibus ipsa. Quaerat similique suscipit tenetur excepturi nam illo voluptatibus soluta, deleniti omnis aspernatur blanditiis sunt consequatur?</p>
            <div className="flex justify-center items-center mt-4">
              <Image src="/assets/dummy-foto.png" height="400" width="400" alt="..." />
            </div>
            <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus voluptate nulla voluptatum suscipit eaque, at nesciunt asperiores deleniti culpa nobis odit, ullam eum, accusantium assumenda quaerat necessitatibus! Iste, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi tempora esse inventore nemo temporibus ipsa. Quaerat similique suscipit tenetur excepturi nam illo voluptatibus soluta, deleniti omnis aspernatur blanditiis sunt consequatur?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus voluptate nulla voluptatum suscipit eaque, at nesciunt asperiores deleniti culpa nobis odit, ullam eum, accusantium assumenda quaerat necessitatibus! Iste, eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi tempora esse inventore nemo temporibus ipsa. Quaerat similique suscipit tenetur excepturi nam illo voluptatibus soluta, deleniti omnis aspernatur blanditiis sunt consequatur?</p>
          </div>
          <h1 className="mt-7 text-2xl font-semibold">Explore</h1>
        </div>
        <div className="border-l-2 border-color-neutral col-span-2">
          <div className="flex">
            <div className="gap-6 p-10">
              <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Reward Pool</h1>
                <p className="text-xl font-semibold">NFT</p>
              </div>
              <div className="flex">
                <div className="border-[2px] border-color-neutral rounded-lg p-7">
                  <div className="flex justify-between py-2 px-3 border-[2px] border-color-neutral rounded-xl">
                    <h1>For: </h1>
                    <h1>1000 Particpates</h1>
                  </div>
                  <div className="p-5">
                    <Image src="/assets/dummy-member.jpeg" width="250" height="250" alt="..." />
                    <p className="mt-3">Completing all tasks makes you eligible for prizes of various tiers. If you are selected as a winner for a higher-tier prize, you will no longer be eligible to receive a prize of a lower tier.</p>
                    <div className="mt-4 md:mt-6 lg:mt-8">
                      <button
                        onClick={handleShowAlert}
                        className="justify-center items-center p-2 mt-3 border-[2px] border-color-primary rounded-xl bg-color-primary bg-opacity-30"
                      >
                        Take Part
                      </button>
                    </div>
                    {showAlert && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCloseAlert}></div>
                        <div className="relative p-4 rounded-lg">
                          <Close onClose={handleCloseAlert} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <h1 className="mt-6 font-semibold text-2xl">Paticipates:</h1>
              <div className="pt-3 overflow-hidden">
                {/* <GetContributorAddress /> */}
              </div>
              {/* {showCardSubmit && <CardSubmit onClose={handleCloseCardSubmit} />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
