"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const GetTransaction = () => {

  return (
    <div>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx, index) => (
            <li key={index} className="mb-2">
              <p>Contributor: </p>
              <Link target='_blank' href={`https://sepolia.basescan.org/address/${tx}`} className='hover:text-color-typography hover:duration-200'>{tx}</Link>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetTransaction;
