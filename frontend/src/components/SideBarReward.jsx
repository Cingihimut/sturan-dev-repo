"use client"
import Image from "next/image"
import { useState, useEffect } from "react";
import { connectWeb3 } from "../app/utils/web3";
import CardSubmit from "./CardSubmit";
import GetContributorAddress from "@/app/dataContributor/GetContributorAddress";

const SideBarReward = () => {

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
              <button onClick={handleTakePartClick} className="justify-center items-center p-2 mt-3 border-[2px] border-color-primary rounded-xl bg-color-primary bg-opacity-30">Fund Now</button>
            </div>
          </div>
        </div>
        <h1 className="mt-6 font-semibold text-2xl">Paticipates:</h1>
        <div className="pt-3 overflow-hidden">
          <GetContributorAddress />
        </div>
        {showCardSubmit && <CardSubmit onClose={handleCloseCardSubmit} />}
      </div>
    </div>
  )
}

export default SideBarReward