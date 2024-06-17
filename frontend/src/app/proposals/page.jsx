import Image from "next/image";
import Link from "next/link";

const Participate = () => {
  return (
    <div className="p-9">
      <h1 className="text-2xl font-bold">Proposals</h1>
      <div className="mt-4 flex gap-5 justify-center">
        <Link href="/proposals/aloa_games" className="border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="ml-4 font-semibold">Palestine need you</h1>
          <p className="ml-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 ml-4 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">20/7/2024</p>
            <p className="mt-2">20000XTR</p>
          </div>
          <p className="ml-4 mt-2 p-2 bg-color-green bg-opacity-30 border-[2px] border-color-green rounded-full text-center">Ongoing</p>
        </Link>
        <Link href="/proposals/beta_project" className="border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="ml-4 font-semibold">Environmental maintenance action</h1>
          <p className="ml-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 ml-4 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">TBA</p>
            <p className="mt-2">TBA</p>
          </div>
          <p className="ml-4 mt-2 p-2 bg-color-secondary bg-opacity-25 border-[2px] border-color-secondary rounded-full text-center">Pending</p>
        </Link>
        <Link href="/proposals/gamma_initiative" className="border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="ml-4 font-semibold">Wild horse conservation</h1>
          <p className="ml-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 ml-4 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">18/4/2024</p>
            <p className="mt-2">10000XTR</p>
          </div>
          <p className="ml-4 mt-2 p-2 bg-color-red bg-opacity-25 border-[2px] border-color-red rounded-full text-center">Close</p>
        </Link>
        <Link href="/proposals/delta_ventures" className="border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="ml-4 font-semibold">African civil war</h1>
          <p className="ml-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 ml-4 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">28/7/2024</p>
            <p className="mt-2">200000XTR</p>
          </div>
        <p className="ml-4 mt-2 p-2 bg-color-green bg-opacity-25 border-[2px] border-color-green rounded-full text-center">Ongoing</p>
        </Link>
      </div>
    </div>
  );
};

export default Participate;