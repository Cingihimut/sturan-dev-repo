import Image from "next/image";
import Link from "next/link";

const Marketplace = () => {
    return (
        <>
            <div className="flex">
                <div className="p-12">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold">Claimable NFTs</h1>
                    </div>
                    <div className="link-hover bg-gray-200 rounded-xl overflow-hidden">
                        <div className="relative w-full h-40">
                            <Image
                                src="/assets/dummy-member.jpeg"
                                layout="fill"
                                objectFit="cover"
                                alt="Palestine need you"
                            />
                        </div>
                        <div className="p-3">
                            <h1 className="text-color-gray text-lg font-semibold">Palestine need you</h1>
                            <div className="grid grid-cols-2 mt-2">
                                <p className="text-color-gray font-bold">id</p>
                                <p className="text-color-gray font-bold">available claim</p>
                                <p className="text-color-gray font-bold">1</p>
                                <p className="text-color-gray font-bold">50</p>
                            </div>
                            <div className="mt-2 w-full">
                                <button className="bg-blue-600 font-semibold text-color-white py-2 px-4 rounded-full w-full">Mint</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Marketplace;