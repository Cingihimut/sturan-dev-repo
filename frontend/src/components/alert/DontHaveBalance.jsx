import Image from "next/image";
import Link from "next/link";

const DontHaveBalance = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="rounded-xl p-7 text-center bg-color-primary shadow-2xl">
                <p className="text-3xl mb-2 font-bold">OOPS!!!</p>
                <Image src="/assets/cry.gif" height="150" width="150" className="mx-auto mb-4"/>
                <h1 className="text-lg">You don't have balance usdcs, please visit this <Link href="/claim_xtr" className="border-b-2 text-color-white text-xl">Link</Link> to claim usdcs</h1>
            </div>
        </div>
    );
}

export default DontHaveBalance;
