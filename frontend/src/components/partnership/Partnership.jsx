import Link from "next/link";
import TypeIt from "typeit-react";

const Partnership = () => {
    return (
        <div className="flex justify-center items-center p-8 md:p-28">
            <div className="w-full md:w-auto px-6 md:px-10 py-6 md:py-8 rounded-xl text-center">
                <TypeIt className="text-3xl md:text-5xl font-bold">
                    <span className="text-color-primary">Join</span> Sturan Network Today!
                </TypeIt>
                <p className="text-lg md:text-xl font-semibold text-gray-600 my-4 md:mb-5">
                    Build campaign to help together in the world
                </p>
                <div className="mt-4">
                    <Link href="mailto:sturandev@gmail.com?subject=Collaboration" className="w-full md:w-auto py-2 px-6 md:px-8 bg-color-primary font-semibold rounded-full hover:bg-color-sky hover:duration-300">
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Partnership;