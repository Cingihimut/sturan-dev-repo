"use client"
import { useState } from "react";
import Link from "next/link";
import ConnectButton from "./ConnectButton"
import { Hamburger, X } from "@phosphor-icons/react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-opacity-10 border-b-2 border-color-gray w-full">
            <div className="p-4 sm:p-6">
                {/* Top navbar section */}
                <div className="flex justify-between items-center px-4 sm:px-6">
                    <Link href="/" className="font-bold text-lg sm:text-xl text-color-primary">
                        Sturan Network
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/campaign" className="hover:underline decoration-1">
                            Start a campaign
                        </Link>
                        <Link href="/vote" className="hover:underline decoration-1">
                            Vote
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ConnectButton />

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-6 h-6 flex flex-col justify-center space-y-1"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X size={32} color="#41C9E2"/>
                            ) : (
                                <Hamburger size={32} color="#41C9E2" />
                            )}
                        </button>
                    </div>
                </div>
                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden px-4 py-2 mt-2 space-y-2">
                        <Link
                            href="/campaign"
                            className="block py-2 hover:underline decoration-1"
                        >
                            Start a campaign
                        </Link>
                        <Link
                            href="/vote"
                            className="block py-2 hover:underline decoration-1"
                        >
                            Vote
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;