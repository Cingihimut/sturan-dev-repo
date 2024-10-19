"use client"
import { X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useConnect, useAccount, useReadContract, useWriteContract, useBalance } from "wagmi";
import { injected } from "@wagmi/core";
import { baseSepolia } from "viem/chains";
import UsdcsAbi from "../contracts/Usdcs.json";
import CrwdfundingAbi from "../contracts/Crowdfunding.json"
import DontHaveBalance from "./alert/DontHaveBalance";
import { parseUnits } from "viem";

const UsdcsAddress = "0x57c58d1869e9c354683C2477759402ba7Cb99043";
const CrowdfundingAddress = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";

const CardSubmit = ({ onClose }) => {
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const [UsdcsBalance, setUsdcsBalance] = useState(0);
  const { writeContractAsync } = useWriteContract();
  const [started, setStarted] = useState(false);
  const [campaignId, setCampaignId] = useState("");  // State untuk campaignId
  const [errors, setErrors] = useState();
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showCardSubmit, setShowCardSubmit] = useState(true);
  const [showDontHaveBalancePopup, setShowDontHaveBalancePopup] = useState(false);

  const { data: balanceData } = useReadContract({
    address: UsdcsAddress,
    abi: UsdcsAbi.abi,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (balanceData) {
      setUsdcsBalance(parseFloat(balanceData.toString()) / 1e18);
    }
  }, [balanceData]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setErrors(null);
  };


  const handleCampaignIdChange = (e) => {
    setCampaignId(e.target.value);  // Update state saat user mengubah campaignId
  };


  const handleSubmit = async () => {
    try {
      setErrors('')
      setStarted(true)
      if (!address) {
        await connectAsync({ chainId: baseSepolia.id, connector: injected() })
      }

      const data = await writeContractAsync({
        chainId: baseSepolia.id,
        address: UsdcsAddress,
        functionName: 'approve',
        abi: UsdcsAbi.abi,
        args: [
          CrowdfundingAddress,
          Math.round(inputValue * 1e18)
        ]
      })

      const contributeTx = await writeContractAsync({
        chainId: baseSepolia.id,
        address: CrowdfundingAddress,
        abi: CrwdfundingAbi.abi,
        functionName: 'contribute',
        args: [
          campaignId,
          Math.round(inputValue * 1e18)
        ]
      })
      console.log(contributeTx);
      setCompleted(true)
      console.log(data);
    } catch (error) {
      console.log(error);
      setStarted(false)
      setErrors("Payment failed")
    }
  }

  return (
    <>
      {showDontHaveBalancePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative bg-white max-w-sm rounded overflow-hidden shadow-lg p-1">
            <button
              onClick={() => setShowDontHaveBalancePopup(false)}
              className="absolute right-0 mt-10 mr-2 bg-red-500 text-white rounded-full"
            >
              <X size={32} />
            </button>
            <DontHaveBalance />
          </div>
        </div>
      )}
      {showCardSubmit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative max-w-sm rounded-xl border-[2px] border-color-neutral overflow-hidden shadow-lg bg-white backdrop-filter-none">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-2 mr-2 text-color-red rounded-full px-2 py-1"
            >
              <X size={32} />
            </button>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Enter your Usdcs Amount</div>
              <p className="text-gray-700 text-base">Usdcs Balance: {UsdcsBalance}</p>
              {errors && <p className="text-red-500 text-sm mt-2">{errors}</p>}
            </div>
            <div className="px-6 pt-4 pb-2">
              <input
                type="number"
                className="border-[2px] rounded-full border-opacity-20 border-color-gray p-1"
                placeholder="Input Number"
                value={inputValue}
                onChange={handleChange}
              />
              <button
                onClick={handleSubmit}
                className="ml-3 p-2 bg-color-typography rounded-full font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardSubmit;
