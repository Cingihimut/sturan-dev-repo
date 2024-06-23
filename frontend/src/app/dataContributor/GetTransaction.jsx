"use client";
import React, { useEffect, useState } from 'react';
import { fetchingTransaction } from '../utils/fetchingDataTransaction';
import Link from 'next/link';

const GetTransaction = ({ campaignId, setContributors }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchingTransaction(campaignId);
        setTransactions(data);
        setContributors(data);  // Pass the list of transactions (contributors) to the parent component
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchTransactions();
    }
  }, [campaignId, setContributors]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx, index) => (
            <li key={index} className="mb-2">
              <p>Contributor: </p>
              <Link target='_blank' href={`https://sepolia.etherscan.io/address/${tx}`} className='hover:text-color-typography hover:duration-200'>{tx}</Link>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetTransaction;
