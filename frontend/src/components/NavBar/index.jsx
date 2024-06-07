import Link from "next/link";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
    return (
        <>
            <header className="bg-color-primary bg-opacity-10 border-b-2 border-color-gray border-opacity-10 p-4 sm:p-6 w-full">
                <div className="flex justify-between items-center px-4 sm:px-6 w-full">
                    <Link href="/" className="font-bold text-lg sm:text-xl text-color-primary">
                        Sturan Network
                    </Link>
                    <ConnectButton />
                </div>
            </header>
        </>
    );
}

export default Navbar;
