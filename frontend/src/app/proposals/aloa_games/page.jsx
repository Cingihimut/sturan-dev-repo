"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { connectWeb3 } from "../../utils/web3";
import CardSubmit from "../../../components/CardSubmit";
import GetContributorAddress from "@/app/dataContributor/GetContributorAddress";

const Page = () => {
  const [account, setAccount] = useState(null);
  const [showCardSubmit, setShowCardSubmit] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const web3Instance = await connectWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking connection", error);
      }
    };

    checkConnection();
  }, []);

  const handleConnect = async () => {
    try {
      const web3Instance = await connectWeb3();
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Connection Failed", error);
    }
  };

  const handleTakePartClick = async () => {
    if (!account) {
      await handleConnect();
    }
    if (account) {
      setShowCardSubmit(true);
    }
  };

  const handleCloseCardSubmit = () => {
    setShowCardSubmit(false);
  };

  return (
    <div className={`min-h-screen bg-color-primary bg-opacity-10 ${showCardSubmit ? 'blur-background' : ''}`}>
      <div className="p-6 md:p-16 lg:p-24">
        <div className="p-6 md:p-10 border-t-[2px] border-x-[2px] border-color-gray border-opacity-15 rounded-t-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center lg:justify-start">
            <Image
              alt="dummy nft"
              src="/assets/dummy foto.png"
              height="400"
              width="400"
              className="mx-auto lg:mx-0 w-[300px] h-[300px]"
            />
          </div>
          <div className="lg:ml-8">
            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Aloa Games</h1>
            <p className="mt-2 md:mt-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni,
              quae voluptate fugit obcaecati rem sapiente at quia eaque. Aliquam
              delectus unde eos officiis cum velit quos dolore amet qui
              voluptate!
            </p>
            <p className="mt-2 md:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="mx-6 md:mx-10 lg:mx-16 mt-6 md:mt-8 lg:mt-10">
          <h1 className="text-lg md:text-xl lg:text-2xl">Detail projects</h1>
          <p className="mt-2 md:mt-4 lg:mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="mt-4 md:mt-6 lg:mt-8">
            <button
              onClick={handleTakePartClick}
              className="p-2 md:p-3 lg:p-4 bg-color-primary rounded-full hover:bg-opacity-50 transition-all ease-linear"
            >
              Take Part
            </button>
          </div>
          <div className="pt-3 overflow-hidden">
            <GetContributorAddress />
          </div>
        </div>
      </div>
      {showCardSubmit && <CardSubmit onClose={handleCloseCardSubmit} />}
    </div>
  );
};

export default Page;
