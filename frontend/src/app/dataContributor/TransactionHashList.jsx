// TransactionHashList.jsx
import Link from 'next/link';
import React from 'react';

const TransactionHashList = ({ transactionHashes }) => {
  return (
    <div className="transaction-hash-list">
      <h2 className="text-lg font-semibold">Transaction Hashes</h2>
      <ul>
        {transactionHashes.map((hash, index) => (
          <li key={index}>
            <Link 
              href={`https://sepolia.etherscan.io/tx/${hash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {hash}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHashList;
