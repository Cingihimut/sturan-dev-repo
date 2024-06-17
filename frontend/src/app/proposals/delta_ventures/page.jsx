"use client";
import Image from "next/image";
import SideBarReward from "@/components/SideBarReward";

const Page = () => {

  return (
    <div className="min-h-screen bg-opacity-10">
      <div className="ml-12 grid grid-cols-5 ">
        <div className="flex-1 pr-6 col-span-3">
          <div className="flex items-center gap-32 justify-between">
            <div className="mt-12 flex justify-between items-center gap-52">
              <h1 className="text-2xl font-semibold">African culture lovers community</h1>
              <button className="py-2 px-6 border-[2px] border-color-neutral rounded-full">Share</button>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold">African children need our help🙇‍♂️🙇‍♀️</h1>
            <div className="flex gap-4 mt-3">
              <p className="border-[2px] p-1 border-color-green rounded-full bg-color-green bg-opacity-25">Ongoing</p>
              <p className="border-[2px] p-1 border-color-green rounded-full bg-color-green bg-opacity-25">15/6/2024 ~ 28/7/2024</p>
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
          <SideBarReward />
        </div>
      </div>
    </div>
  );
};

export default Page;
