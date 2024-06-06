"use client"
import { useState } from "react";
import { fundCrowdfunding } from "../utils/fundCrowdfunding";

const GetReceipt = ({ contributors }) => {
    const [receipt, setReceipt] = useState(null)

    const handleGetReceipt = async(amount) => {
        try {
            const transactionHash = await fundCrowdfunding(amount);
            setReceipt(transactionHash)
        } catch (error) {
            console.error("Error get data receipt", error);
        }
    }

    return (
        <div className="mx-11 mt-8">
            <h2 className="font-semibold text-lg">Contributors History</h2>
            {receipt && <p>Transaction Hash: {receipt}</p>}
            {contributors.length > 0 && (
                <div>
                    <h3>Contributors:</h3>
                    <ul>
                        {Object.entries(contributors).map(([address, amount]) => (
                            <li key={address}>
                                Address: {address}, Amount: {amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GetReceipt;