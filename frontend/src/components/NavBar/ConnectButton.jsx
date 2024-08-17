"use client";
import { useState, useEffect } from "react";
import { connectWeb3, isOwner, disconnectWeb3 } from "../../app/utils/web3";
import { useRouter } from 'next/navigation';

const ConnectButton = () => {
    const [account, setAccount] = useState(null);
    const [isContractOwner, setIsContractOwner] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkOwnerStatus = async () => {
            if (account) {
                try {
                    const ownerStatus = await isOwner(account);
                    setIsContractOwner(ownerStatus);
                    // Redirect based on owner status
                    if (ownerStatus) {
                        router.push("/dashboard/owner");
                    } else {
                        router.push("/users/dashboard");
                    }
                } catch (error) {
                    console.error("Error checking owner status", error);
                }
            }
        };

        checkOwnerStatus();
    }, [account, router]);

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
        disconnectWeb3();
    };

    const handleAvatarClick = () => {
        if (isContractOwner) {
            router.push("/dashboard/owner");
        } else {
            router.push("/users/dashboard");
        }
    };

    return (
        <>
            {account ? (
                <div
                    onClick={handleAvatarClick}
                    className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                >
                    <span className="font-medium text-gray-600 dark:text-gray-300">U</span>
                </div>
            ) : (
                <>
                    <button
                        onClick={handleConnect}
                        className="font-bold p-2 text-color-primary border-[1px] border-color-primary border-opacity-15 hover:shadow-xl rounded-xl transition-all duration-300 ease-out"
                    >
                        Connect
                    </button>
                </>
            )}
        </>
    );
};

export default ConnectButton;
