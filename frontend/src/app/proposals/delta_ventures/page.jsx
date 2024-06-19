"use client";
import Image from "next/image";
import SideBarReward from "@/components/SideBarReward";

const Page = () => {
  return (
    <div className="min-h-screen bg-opacity-10 p-4 md:p-6 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="col-span-1 lg:col-span-3 pr-0 lg:pr-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl lg:text-2xl font-semibold">Badan Amal Indonesia</h1>
            <button className="py-2 px-4 lg:px-6 border-[2px] border-color-neutral rounded-full">Share</button>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Palestine Need Your Hand, help us for humanity🌎</h1>
            <div className="flex gap-2 lg:gap-4 mt-3 flex-wrap">
              <p className="border-[2px] p-1 lg:p-2 border-color-green rounded-full bg-color-green bg-opacity-25">Ongoing</p>
              <p className="border-[2px] p-1 lg:p-2 border-color-green rounded-full bg-color-green bg-opacity-25">20/6/2024 ~ 20/7/2024</p>
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

export default Page;
