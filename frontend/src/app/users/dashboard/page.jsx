"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

const Page = () => {
    const [profileImage, setProfileImage] = useState('/assets/dummy-member.jpeg');
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setProfileImage(storedImage)
        }
    })

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                setProfileImage(imageData);
                localStorage.setItem('profileImage', imageData)
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-10 gap-4 flex">
            <div className="w-[25%] p-5 border-[1px] rounded-xl shadow-xl">
                <div className="relative border-b-2">
                    <label htmlFor="profile-upload">
                        <div className="relative w-[100px] h-[100px] mb-3 cursor-pointer rounded-full overflow-hidden">
                            <Image
                                src={profileImage}
                                alt="Profile"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            />
                            {hover && (
                                <div
                                    className="absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full pointer-events-none"
                                    style={{ height: '100px', width: '100px' }}
                                >
                                    <span className="text-white text-xs ml-4">Upload your profile</span>
                                </div>
                            )}
                        </div>
                    </label>
                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
                <p className="mt-5">Wallet Account:</p>
                <p className="mt-5">Total Spending:</p>
                <p className="mt-5">Total Contribute:</p>
                <p className="mt-5">Wallet Balance(USDC):</p>
                <p className="mt-5">Wallet Status:</p>
            </div>
            <div className="w-[75%] ml-5 grid grid-cols-2 gap-5">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-lg mb-4">Highest Increase</h2>
                    <div className="chart-container">
                        {/* Gambar atau chart di sini */}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-lg mb-4">Highest Drop</h2>
                    <div className="chart-container">
                        {/* Gambar atau chart di sini */}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-lg mb-4">Saved Campaign</h2>
                    <div className="chart-container">
                        {/* Gambar atau chart di sini */}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-lg mb-4">Investor Contract On Auction</h2>
                    <div className="chart-container">
                        {/* Gambar atau peta di sini */}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg col-span-2">
                    <h2 className="font-bold text-lg mb-4">Total Profit</h2>
                    <div className="chart-container">
                        {/* Gambar atau chart di sini */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
