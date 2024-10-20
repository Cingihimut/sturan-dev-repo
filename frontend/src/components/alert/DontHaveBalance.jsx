import Image from "next/image";
import Link from "next/link";

const DontHaveBalance = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="rounded-xl p-7 text-center bg-color-primary shadow-2xl">
                <p className="text-3xl mb-2 font-bold">OOPS!!!</p>
                <Image src="/assets/cry.gif" height="150" width="150" className="mx-auto mb-4" />
            </div>
        </div>
    );
}

export default DontHaveBalance;
