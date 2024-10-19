"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Participate from "./proposals/page";
import Ended from "../components/ended/Ended";
import WillBeOver from "../components/willbeover/WillBeOver";

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [campaigns, setCampaigns] = useState([]); // Tambahkan state untuk campaigns
  const [signClient, setSignClient] = useState(null);

  useEffect(() => {
    // Contoh data campaign, bisa diubah untuk mengambil dari API atau smart contract
    const fetchCampaigns = async () => {
      const fetchedCampaigns = [
        {
          id: "1",
          name: "Campaign 1",
          endTime: Math.floor(Date.now() / 1000) - 10000, // Sudah berakhir
          isOpen: false,
          goal: "100000000000000000000", // 100 USDC
        },
        {
          id: "2",
          name: "Campaign 2",
          endTime: Math.floor(Date.now() / 1000) + 10000, // Belum berakhir
          isOpen: true,
          goal: "200000000000000000000", // 200 USDC
        },
      ];
      setCampaigns(fetchedCampaigns); // Update state dengan campaigns yang diambil
    };

    fetchCampaigns(); // Memanggil fungsi untuk mengambil campaigns

    const initSignClient = async () => {
      try {
        const client = await SignClient.init({
          projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        });
        setSignClient(client);
        console.log("SignClient initialized:", client);
      } catch (error) {
        console.error("Failed to initialize SignClient:", error);
      }
    };

    initSignClient();
  }, []);

  const images = [
    "/assets/campaign-palestine.png",
    "/assets/donation.png",
    "/assets/huricane.png",
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <div id="controls-carousel" className="relative w-full p-4 md:p-8" data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((src, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${index === activeIndex ? "block" : "hidden"}`}
              data-carousel-item={index === activeIndex ? "active" : ""}
            >
              <Image
                width="2500"
                height="2500"
                src={src}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-full h-full rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-color-typography"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-full h-full rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-color-typography"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-color-neutral mb-2 mt-3 ml-6">Available Campaigns</h1>
      <Participate />
      <h1 className="text-xl sm:text-2xl font-bold text-color-neutral mb-2 mt-3 ml-6">Will be over</h1>
      <WillBeOver />
      <h1 className="text-xl sm:text-2xl font-bold text-color-neutral mb-2 mt-3 ml-6">Ended</h1>
      <Ended campaigns={campaigns} />
    </>
  );
};

export default Page;
