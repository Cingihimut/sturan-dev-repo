"use client";
import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getConnectedAccount, getTokenBalance } from "../app/utils/contract";
import { contribute, approveToken } from "../app/utils/contributeCampaign";
import contractJson from "../contracts/Xtr.json";
import DontHaveBalance from "./alert/DontHaveBalance";

const contractAbi = contractJson.abi;
const XTRAddress = "0x6F256B3E7650eca65B96f73011beC41638F4253C";

const CardSubmit = ({ onClose, campaignId }) => {
    const [inputValue, setInputValue] = useState('');
    const [account, setAccount] = useState(null);
    const [XTRBalance, setXTRBalance] = useState(null);
    const [showCardSubmit, setShowCardSubmit] = useState(true);
    const [showDontHaveBalancePopup, setShowDontHaveBalancePopup] = useState(false);

    useEffect(() => {
        const initializeAccount = async () => {
            try {
                const connectedAccount = await getConnectedAccount();
                setAccount(connectedAccount);
            } catch (error) {
                console.error("Error initializing account", error);
            }
        };

        initializeAccount();
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                if (account) {
                    const balance = await getTokenBalance(account, contractAbi, XTRAddress);
                    setXTRBalance(balance);
                    if (balance <= 0) {
                        setShowCardSubmit(false);
                        setShowDontHaveBalancePopup(true);
                    }
                }
            } catch (error) {
                console.error("Error getting user info", error);
            }
        };
        fetchBalance();
    }, [account]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setInputValue(value);
        }
    }; 
    
    const handleSubmit = async () => {
        if (!campaignId) {
            console.error("Campaign ID is undefined");
            return;
        }

        if (inputValue === '') {
            console.log('Input value is empty');
            return;
        }

        const contributionAmount = parseFloat(inputValue);
        const crowdfundingAddress = "0x6fe9Eac96fdFCE9Bb73A2fB4D9b8744ce7018EAE";

        try {
            await approveToken(crowdfundingAddress, contributionAmount);
            console.log("Approval successful");
            const transactionHash = await contribute(campaignId, contributionAmount);
            console.log("Contribution successful, transaction hash:", transactionHash);
            onClose();
        } catch (error) {
            console.error("Error submitting contribution:", error);
        }
    };
    return (
        <>
            {showDontHaveBalancePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="relative bg-white max-w-sm rounded overflow-hidden shadow-lg p-1">
                        <button onClick={() => setShowDontHaveBalancePopup(false)} className="absolute right-0 mt-10 mr-2 bg-red-500 text-white rounded-full">
                            <X size={32} />
                        </button>
                        <DontHaveBalance />
                    </div>
                </div>
            )}
            {showCardSubmit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="relative max-w-sm rounded-xl border-[2px] border-color-neutral overflow-hidden shadow-lg bg-white backdrop-filter-none">
                        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-color-red rounded-full px-2 py-1">
                            <X size={32} />
                        </button>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Enter your XTR Amount</div>
                            <p className="text-gray-700 text-base">XTR Balance: {XTRBalance}</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <input
                                type="text"
                                className="border-[2px] rounded-full border-opacity-20 border-color-gray p-1"
                                placeholder="Input Number"
                                value={inputValue}
                                onChange={handleChange}
                            />
                            <button onClick={handleSubmit} className="ml-3 p-2 bg-color-typography rounded-full font-semibold">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardSubmit;
