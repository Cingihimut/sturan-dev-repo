"use client";
import { Avatar, Button, Card } from "flowbite-react";
import Link from "next/link";

const Delegates = () => {
    return (
        <>
            <div className="border-t-2">
                <h1 className="text-3xl font-bold mt-6 text-center md:text-left">Trusted Delegates</h1>
            </div>
            <div className="mt-4 gap-5">
                <div className="p-4 bg-gray-950">
                    <h1 className="text-2xl text-white mb-4 text-center md:text-left">Aligned Delegates</h1>
                    <Card className="bg-gray-900 border-0">
                        {/* Vote and Expiry Information */}
                        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>NO VOTE HISTORY</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                                <span>EXPIRES APR 20 2025 20:25 UTC</span>
                            </div>
                        </div>

                        {/* Avatar and Delegate Button */}
                        <div className="flex flex-col items-center md:flex-row gap-3 mb-4">
                            <div className="relative">
                                <Avatar
                                    size="lg"
                                    className="ring-2 ring-gray-800"
                                    img="data:image/jpeg;base64,..." // Ganti dengan URL gambar yang valid
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-gray-900"></div>
                            </div>
                            <div className="text-center md:text-left w-full md:w-auto">
                                <span className="font-medium text-white">Rocky</span>
                                <span className="text-gray-400 text-sm ml-2">0x2070c...2fa3</span>
                            </div>
                            <div className="w-full md:w-auto">
                                <Button
                                    className="bg-teal-800 text-teal-400 w-full md:w-auto py-2 rounded-full"
                                >
                                    Delegate XTR
                                </Button>
                            </div>
                        </div>

                        {/* Participation and Communication Data */}
                        <div className="flex flex-col gap-3 md:flex-row mb-4 text-gray-400 text-sm items-center md:items-start">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>NO PARTICIPATION DATA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                                <span>NO COMMUNICATION DATA</span>
                            </div>
                        </div>

                        {/* Profile Link */}
                        <Link
                            href="#"
                            target="_blank"
                            className="flex justify-center p-2 rounded-xl text-white hover:bg-gray-800 hover:text-white duration-300 mb-4"
                        >
                            View Profile Details
                        </Link>

                        {/* Delegated XTR Information */}
                        <div className="mt-4 text-center md:text-right">
                            <div className="text-3xl text-white">0</div>
                            <div className="text-gray-400">Total XTR delegated</div>
                        </div>

                        {/* No Executive Supported */}
                        <div className="mt-6 text-center text-gray-400">
                            CURRENTLY NO EXECUTIVE SUPPORTED
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Delegates;
