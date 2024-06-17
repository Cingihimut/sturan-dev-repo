"use client";
import { useState } from "react";
import Image from "next/image";
import Participate from "./proposals/page";
import News from "./news/News";

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/assets/dummy-foto.png",
    "/assets/dummy-foto.png",
    "/assets/dummy-foto.png",
    "/assets/dummy-foto.png",
    "/assets/dummy-foto.png",
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
            <div key={index} className={`duration-700 ease-in-out ${index === activeIndex ? "block" : "hidden"}`} data-carousel-item={index === activeIndex ? "active" : ""}>
              <Image width="350" height="350" src={src} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button type="button" onClick={handlePrev} className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-full h-full rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg className="w-4 h-4 text-color-typography" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" onClick={handleNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-full h-full rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg className="w-4 h-4 text-color-typography" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <Participate />
      <News />
    </>
  );
};

export default Page;
