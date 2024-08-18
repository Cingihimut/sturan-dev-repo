import Image from "next/image";
import Link from "next/link";

const NotOwner = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">You Are Not Owner</h1>
            <Image src="/assets/sorry.gif" height="500" width="500" alt="Sorry" />
            <p>Please go <Link href="/" className="text-blue-500 underline">Back</Link></p>
        </div>
    );
}

export default NotOwner;
''