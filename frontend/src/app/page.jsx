"use client";

import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import Participate from "./proposals/proposals";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-color-primary border-b-2 border-color-gray border-opacity-10 p-4 mb-4 rounded-xl shadow-xl fixed bottom-0 left-0 w-full lg:hidden z-50">
        <div className="flex justify-between items-center mx-4">
          <div className="flex items-center space-x-4">
            <Image src="/assets/XTR-Logo.png" alt="xtr logo" width="50" height="50" />
            <p className="font-bold ml-4 text-lg text-color-primary">STURAN</p>
          </div>
          <div className="flex items-center space-x-2">
            <SocialIcon target="blank" url="https://x.com/sturanet/" style={{ height: 30, width: 30 }} bgColor="#252559" />
            <SocialIcon target="blank" url="https://discord.com/" style={{ height: 30, width: 30 }} bgColor="#252559" />
            <Link target="blank" href="https://sepolia.etherscan.io/token/0xb2c86ccfbfbe235657a5d2556f2b3b1156a23283">
              <Image src="/assets/etherscan-logo-circle.png" alt="etherscan" height={30} width={30} />
            </Link>
            <Link target="blank" href="https://testnet.bscscan.com/token/0x2b2FF5967aB3E984f136515a11383BafD2efd82d">
              <Image src="/assets/logo-symbol.png" alt="bscscan" height={30} width={30} />
            </Link>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            <Link href="/" className="block p-2 text-color-white bg-color-typography rounded w-full hover:bg-opacity-90 transition-all duration-300">
              Join Partners
            </Link>
            <Link href="/proposals" className="block p-2 text-color-neutral font-semibold hover:shadow-lg">
              Proposals
            </Link>
            <Link href="/claim_xtr" className="block p-2 text-color-neutral font-semibold hover:shadow-lg">
              Claim XTR
            </Link>
            <Link href="https://github.com/Sturan-Dev/WhitePaper" target="_blank" className="block p-2 text-color-neutral font-semibold hover:shadow-lg">
              About XTR
            </Link>
          </div>
        )}
      </header>

      <div className="bg-color-primary bg-opacity-10 min-h-screen pt-20 lg:pt-0 px-4 lg:px-0 lg:pl-16">
        <div className="lg:grid lg:grid-cols-10 lg:gap-4">
          <div className="hidden lg:block col-span-2 p-3 rounded-lg mt-10 border-opacity-10">
            <Image src="/assets/XTR-Logo.png" alt="xtr logo" width="50" height="50" className="mt-3 ml-3" />
            <p className="font-bold ml-4 mt-2 text-xl">STURAN</p>
            <p className="font-semibold ml-4 mt-1">100 Partners</p>
            <Link href="/" className="mt-1 flex justify-center p-2 text-color-white bg-color-typography rounded-full w-full hover:bg-opacity-90 transition-all duration-300">
              Join Partners
            </Link>
            <div className="mt-4 space-y-2 font-semibold flex flex-col px-4 py-2 relative overflow-hidden">
              <div className="border-b-[2px] ml-[10px]">
                <span>Proposals</span>
                <span className="line"></span>
              </div>
              <Link href="/claim_xtr" className="ml-[10px] py-2 relative overflow-hidden">
                <span>Claim XTR</span>
                <span className="line"></span>
              </Link>
              <Link href="https://github.com/Sturan-Dev/WhitePaper" target="_blank" className="ml-[10px] py-2 relative overflow-hidden">
                <span>About XTR</span>
                <span className="line"></span>
              </Link>
            </div>
            <div className="mt-4 flex ml-4 space-x-4">
              <SocialIcon target="blank" url="https://x.com/" style={{ height: 30, width: 30 }} bgColor="#252559" />
              <SocialIcon target="blank" url="https://discord.com/" style={{ height: 30, width: 30 }} bgColor="#252559" />
              <Link target="blank" href="https://sepolia.etherscan.io/token/0xb2c86ccfbfbe235657a5d2556f2b3b1156a23283">
                <Image src="/assets/etherscan-logo-circle.png" alt="etherscan" height={30} width={30} />
              </Link>
              <Link target="blank" href="https://testnet.bscscan.com/token/0x2b2FF5967aB3E984f136515a11383BafD2efd82d">
                <Image src="/assets/logo-symbol.png" alt="bscscan" height={30} width={30} />
              </Link>
            </div>
          </div>
          <div className="col-span-8 lg:pl-4 md:mt-3">
            <Participate />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
