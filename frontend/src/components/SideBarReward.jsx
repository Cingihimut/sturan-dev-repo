"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { connectWeb3 } from "../app/utils/web3";
import { fetchingTransaction } from "../app/utils/fetchingDataTransaction";
import CardSubmit from "./CardSubmit";
import TransactionHashList from "@/app/dataContributor/TransactionHashList";

const SideBarReward = () => {
  const [account, setAccount] = useState(null);
  const [showCardSubmit, setShowCardSubmit] = useState(false);
  const [campaignId, setCampaignId] = useState(null);
  const [transactionHashes, setTransactionHashes] = useState([]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const web3Instance = await connectWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log("Connected account:", accounts[0]);
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
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Connection Failed", error);
    }
  };

  const handleTakePartClick = async () => {
    if (!account) {
      await handleConnect();
    }
    if (account) {
      setCampaignId(1);
      setShowCardSubmit(true);

      // Fetch transaction hashes
      try {
        const data = await fetchingTransaction(1);
        console.log("Fetched transaction hashes:", data.transactionHashes); // Log hash transaksi
        setTransactionHashes(data.transactionHashes);
      } catch (error) {
        console.error("Error fetching transaction hashes", error);
      }
    }
  };

  const handleCloseCardSubmit = () => {
    setShowCardSubmit(false);
  };

  return (
    <div className="flex flex-col p-4 lg:p-10">
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg lg:text-xl font-semibold">Reward Pool</h1>
        <p className="text-lg lg:text-xl font-semibold">NFT</p>
      </div>
      <div className="border-[2px] border-color-neutral rounded-lg p-4 lg:p-7">
        <div className="flex justify-between py-2 px-3 border-[2px] border-color-neutral rounded-xl mb-4">
          <h1>For: </h1>
          <h1>1000 Participates</h1>
        </div>
        <div className="flex justify-center mb-4">
          <Image src="/assets/dummy-member.jpeg" width="250" height="250" alt="..." className="w-full h-auto max-w-xs lg:max-w-none" />
        </div>
        <p className="mb-4">Completing all tasks makes you eligible for prizes of various tiers. If you are selected as a winner for a higher-tier prize, you will no longer be eligible to receive a prize of a lower tier.</p>
        <button onClick={handleTakePartClick} className="w-full py-2 border-[2px] border-color-primary rounded-xl bg-color-primary bg-opacity-30">
          Fund Now
        </button>
      </div>
      <h1 className="mt-6 text-xl lg:text-2xl font-semibold">Participates:</h1>
      <div className="pt-3 overflow-hidden">
        {transactionHashes.length > 0 ? (
          <TransactionHashList transactionHashes={transactionHashes} />
        ) : (
          <p>No transaction hashes available.</p>
        )}
      </div>
      {showCardSubmit && <CardSubmit onClose={handleCloseCardSubmit} campaignId={campaignId} />}
    </div>
  );
};

export default SideBarReward;
