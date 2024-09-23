"use client";
import { X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import { useApproveToken, useTransferToken } from '../app/utils/contract';
import UsdcsAbi from "../contracts/Usdcs.json";
import DontHaveBalance from "./alert/DontHaveBalance";

const UsdcsAddress = "0xbC65E83Fa8D5A482B637f80cc4edc294ad8B5c75";
const CrowdfundingAddress = "0xF6D8Dfb75f0aeB4fdd9FeE729EC9D88F095C1D9F";

const CardSubmit = ({ onClose }) => {
  const { address } = useAccount();
  const [UsdcsBalance, setUsdcsBalance] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showCardSubmit, setShowCardSubmit] = useState(true);
  const [showDontHaveBalancePopup, setShowDontHaveBalancePopup] = useState(false);
  const [error, setError] = useState(null);

  const { data: balanceData } = useContractRead({
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

  const { approve, isApproving, isApproveSuccess, error: approveError } = useApproveToken(CrowdfundingAddress, inputValue);
  const { transfer, isTransferring, isTransferSuccess, error: transferError } = useTransferToken(CrowdfundingAddress, inputValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (parseFloat(inputValue) > UsdcsBalance) {
      setShowDontHaveBalancePopup(true);
    } else {
      try {
        await approve?.();
      } catch (err) {
        setError(err.message || "Approval failed");
      }
    }
  };

  useEffect(() => {
    if (isApproveSuccess) {
      try {
        transfer?.();
      } catch (err) {
        setError(err.message || "Transfer failed");
      }
    }
  }, [isApproveSuccess, transfer]);

  useEffect(() => {
    if (isTransferSuccess) {
      onClose();
    }
  }, [isTransferSuccess, onClose]);

  useEffect(() => {
    if (approveError) {
      setError(approveError.message || "Approval failed");
    }
    if (transferError) {
      setError(transferError.message || "Transfer failed");
    }
  }, [approveError, transferError]);

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
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="px-6 pt-4 pb-2">
              <input
                type="number"
                className="border-[2px] rounded-full border-opacity-20 border-color-gray p-1"
                placeholder="Input Number"
                value={inputValue}
                onChange={handleChange}
                disabled={isApproving || isTransferring}
              />
              <button
                onClick={handleSubmit}
                className="ml-3 p-2 bg-color-typography rounded-full font-semibold"
                disabled={isApproving || isTransferring || !inputValue}
              >
                {isApproving ? "Approving..." : isTransferring ? "Transferring..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardSubmit;