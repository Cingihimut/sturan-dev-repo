import Image from "next/image";
import Link from "next/link";

const Participate = () => {
  return (
    <div className="p-4 sm:p-6 md:p-9">
      <h1 className="text-xl sm:text-2xl font-bold">Proposals</h1>
      <div className="mt-4 flex flex-wrap gap-5 justify-center">
        <Link href="/proposals/aloa_games" className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="font-semibold text-center sm:text-left">Palestine need you</h1>
          <p className="text-center sm:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">20/7/2024</p>
            <p className="mt-2">20000XTR</p>
          </div>
          <p className="mt-2 p-2 bg-green-100 border-2 border-green-500 rounded-full text-center">Ongoing</p>
        </Link>
        <Link href="/proposals/beta_project" className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="font-semibold text-center sm:text-left">Environmental maintenance</h1>
          <p className="text-center sm:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">TBA</p>
            <p className="mt-2">TBA</p>
          </div>
          <p className="mt-2 p-2 bg-color-secondary bg-opacity-35 border-2 border-color-secondary rounded-full text-center">Pending</p>
        </Link>
        <Link href="/proposals/gamma_initiative" className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="font-semibold text-center sm:text-left">Wild horse conservation</h1>
          <p className="text-center sm:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">18/4/2024</p>
            <p className="mt-2">10000XTR</p>
          </div>
          <p className="mt-2 p-2 bg-red-100 border-2 border-red-500 rounded-full text-center">Close</p>
        </Link>
        <Link href="/proposals/delta_ventures" className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] border-[2px] border-color-neutral rounded-xl p-4 link-hover hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <Image src="/assets/dummy-member.jpeg" height="250" width="250" alt="..." className="p-4" />
          </div>
          <h1 className="font-semibold text-center sm:text-left">African civil war</h1>
          <p className="text-center sm:text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <div className="font-semibold grid grid-cols-2 gap-2 mt-2">
            <h1 className="mt-2">Deadline</h1>
            <h1 className="mt-2">Goals</h1>
            <p className="mt-2">28/7/2024</p>
            <p className="mt-2">40000XTR</p>
          </div>
          <p className="mt-2 p-2 bg-color-green bg-opacity-35 border-2 border-color-green rounded-full text-center">Ongoing</p>
        </Link>
      </div>
    </div>
  );
};

export default Participate;
