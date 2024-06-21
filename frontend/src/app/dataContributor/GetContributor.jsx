"use client";
import { useState, useEffect } from "react";
import { fetchingTransaction } from "../utils/fetchingDataTransaction";

const GetContributor = () => {
    const [contributors, setContributors] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchingData = async () => {
            const [contributorsData, contributionsData] = await fetchingTransaction() || [];
            if (contributorsData && contributionsData) {
                setContributors(contributorsData);
                setContributions(contributionsData);
            }
            setLoading(false);
        };

        fetchingData();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (contributors.length === 0 || contributions.length === 0) {
        return <div className="text-center">No contributors found.</div>;
    }

    return (
        <div className="border p-4 rounded shadow-sm overflow-x-auto whitespace-nowrap">
            <ul className="space-y-4">
                {contributors.map((contributor, index) => (
                    <li key={index} className="">
                        <p className="text-lg sm:text-base md:text-sm">Address: {contributor.slice(0,20)}</p>
                        <p className="text-lg sm:text-base md:text-sm">Contribution: {contributions[index]} Xtr</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetContributor;
