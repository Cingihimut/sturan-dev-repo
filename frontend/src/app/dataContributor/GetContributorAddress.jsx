"use client";
import { useState, useEffect } from "react";
import { fetchingTransaction } from "../utils/fetchingDataTransaction";

const GetContributorAddress = () => {
    const [contributors, setContributors] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchingData = async () => {
            const contributorsData = await fetchingTransaction();
            if (contributorsData) {
                setContributors(contributorsData[0]);
                setContributions(contributorsData[1]);
            }
            setLoading(false);
        };

        fetchingData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (contributors.length === 0 || contributions.length === 0) {
        return <div>No contributors found.</div>;
    }

    return (
        <div className="mx-11 mt-8">
            <ul>
                {contributors.map((contributor, index) => (
                    <li key={index}>
                        <p>Address: {contributor}</p>
                        <p>Contribution: {contributions[index]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetContributorAddress;