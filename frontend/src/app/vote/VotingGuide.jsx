"use client"
import Link from 'next/link';
import React, { useState, useRef } from 'react';

const VotingGuide = () => {
  const [selectedSection, setSelectedSection] = useState(1);
  const sectionRefs = useRef([]);

  const menuItems = [
    {
      id: 1,
      title: "Voting Process",
      content: `Each user can cast one vote per-proposal, in this process users can use XTR tokens to vote.`
    },
    {
      id: 2,
      title: " Token Locking at the Time of Proposal Submission",
      content: "Users who wish to propose must lock up a certain amount of XTR tokens as collateral. These tokens will be locked during the voting period."
    },
    {
      id: 3,
      title: "Set up your voting wallet",
      content: "To participate in on-chain voting, you need to set up a compatible wallet with the required tokens. This ensures secure and verifiable participation in the governance process."
    },
    {
      id: 4,
      title: "Delegate your voting power",
      content: "Token holders can delegate their voting power to trusted community members who actively participate in governance decisions."
    },
    {
      id: 5,
      title: "Vote manually",
      content: "Cast your votes directly on proposals using your wallet and tokens. Each vote is recorded on the blockchain for transparency."
    }
  ];

  const handleMenuClick = (id) => {
    setSelectedSection(id);
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-8">How to participate in SturanNetwork Vote?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                selectedSection === item.id
                  ? 'bg-color-primary/10 text-color-primary'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-color-primary">{String(item.id).padStart(2, '0')}</span>
                <span>{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              ref={el => sectionRefs.current[item.id] = el}
              className={`transition-opacity duration-300 ${
                selectedSection === item.id ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="mb-4">
                <span className="text-color-primary text-lg">
                  {String(item.id).padStart(2, '0')}
                </span>
                <h2 className="text-lg md:text-xl font-semibold mt-2">
                  Understand <span className="text-color-primary">{item.title.toLowerCase()}</span>
                </h2>
              </div>
              <p className="text-gray-500 leading-relaxed">
                {item.content}
              </p>
              
              <Link href="https://lpsturanet.vercel.app/docs/getting-started" target='_blank' className="mt-6 text-color-primary hover:underline flex items-center space-x-1">
                <span>Learn more about {item.title.toLowerCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingGuide;
