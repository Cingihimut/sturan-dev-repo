"use client"
import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getConnectedAccount, getTokenBalance } from "../app/utils/contract";
import { fundCrowdfunding, approveToken } from "../app/utils/fundCrowdfunding";
import contractJson from "../contracts/XtrModule#Xtr.json";
import Web3 from "web3";
import DontHaveBalance from "./alert/DontHaveBalance";

const contractAbi = contractJson.abi;
const XTRAddress = "0x5F9E185CF5Fadc4b5F9a600Bd40178cd545e3A63";

const CardSubmit = ({ onClose }) => {
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
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleSubmit = async () => {
        if (inputValue === '') {
            console.log('Input value is empty');
            return;
        }

        const contributionAmount = parseFloat(inputValue);
        const crowdfundingAddress = "0x607821e22c28c59AB60EFA165f62B02147d12D70"; //crowdfunding contract
        

        const contributorAmountInWei = Web3.utils.toWei(contributionAmount.toString(), "ether");

        try {
            await approveToken(crowdfundingAddress, contributorAmountInWei);
            await fundCrowdfunding(contributionAmount);
            onClose();
        } catch (error) {
            console.error("Error submitting error:", error);
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
                    <div className="relative bg-color-primary max-w-sm rounded overflow-hidden shadow-lg bg-white backdrop-filter-none">
                        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full px-2 py-1">
                            <X size={32} />
                        </button>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Enter your XTR Amount</div>
                            <p className="text-gray-700 text-base">XTR Balance: {XTRBalance}</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <input
                                type="number"
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