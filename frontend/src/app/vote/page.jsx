import Link from "next/link"
import AllVote from "./AllVote.jsx"
import VotingGuide from "./VotingGuide.jsx"
import Delegates from "./Delegates.jsx"

const Vote = () => {
    return (
        <>
            <div className="p-6 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl">Sturan Network</h1>
                    <h1 className="font-bold text-xl md:text-2xl">Voting Portal</h1>
                    <p className="mt-4">Use your XTR to define campaign objectives</p>
                </div>
                <div>
                    <div className="flex justify-between">
                        <h1 className="ml-3">Latest campaign</h1>
                        <Link href="#">View more</Link>
                    </div>
                    <div className="ml-3 border-[2px] shadow-lg border-color-neutral rounded-lg mt-5">
                        <div className="p-5">
                            <p>Date ended: </p>
                            <h1 className="mt-4 font-bold mb-2 text-xl">Proposal title</h1>
                            <p className="mb-5 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas impedit sint praesentium dolor, cumque harum porro vitae, ea, maxime quam itaque non reprehenderit aliquid officia consequuntur quis a doloremque? Ullam!</p>
                            <p>Proposer: 0x....</p>
                            <div className="grid grid-cols-2">
                                <button className="mt-3 justify-self-start p-2 md:p-3 border-2 border-color-primary rounded-full">View details</button>
                                <div className="justify-self-end mt-3">
                                    <p>40% Yes | 60% No</p>
                                    <p className="ml-8">Percentage</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center p-3 border-t">
                            <p className="text-sm md:text-base">Passed on Oct 19 2024 14:11 UTC. Available for execution on Oct 21 2024 14:00 UTC.</p>
                        </div>
                    </div>
                </div>
            </div>
            <AllVote />
            <div className="p-6 md:p-16">
                <VotingGuide />
            </div>
            <div className="p-6 md:p-16">
                <Delegates />
            </div>
        </>
    )
}

export default Vote
