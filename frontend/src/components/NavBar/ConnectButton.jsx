"use client";
import { useState, useEffect } from "react";
import { connectWeb3, isOwner, disconnectWeb3 } from "../../app/utils/web3";
import Link from "next/link";

const ConnectButton = () => {
    const [account, setAccount] = useState(null);
    const [isContractOwner, setIsContractOwner] = useState(false);

    useEffect(() => {
        const checkOwnerStatus = async () => {
            if (account) {
                try {
                    const ownerStatus = await isOwner(account);
                    setIsContractOwner(ownerStatus);
                } catch (error) {
                    console.error("Error checking owner status", error);
                }
            }
        };

        checkOwnerStatus();
    }, [account]);

    const handleConnect = async () => {
        try {
            const web3Instance = await connectWeb3();
            const accounts = await web3Instance.eth.getAccounts();
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Connection Failed", error);
        }
    };

    const handleDisconnect = () => {
        setAccount(null);
        setIsContractOwner(false);
        disconnectWeb3();  // Clear web3 instance

        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [{ eth_accounts: {} }]
            });
        }
    };

    return (
        <>
            {account ? (
                isContractOwner ? (
                    <Link href="/dashboard/owner"
                        className="font-bold p-2 text-color-primary border-[1px] border-color-primary border-opacity-15 hover:shadow-xl rounded-xl transition-all duration-300 ease-out"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <button
                        onClick={handleDisconnect}
                        className="font-bold p-2 text-color-primary border-[1px] border-color-primary border-opacity-15 hover:shadow-xl rounded-xl transition-all duration-300 ease-out"
                    >
                        Disconnect
                    </button>
                )
            ) : (
                <button
                    onClick={handleConnect}
                    className="font-bold p-2 text-color-primary border-[1px] border-color-primary border-opacity-15 hover:shadow-xl rounded-xl transition-all duration-300 ease-out"
                >
                    Connect
                </button>
            )}
        </>
    );
};

export default ConnectButton;
