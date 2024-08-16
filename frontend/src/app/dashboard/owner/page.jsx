"use client";
import React, { useState } from 'react';
import Web3 from 'web3';
import { createCampaign } from "../../utils/contract";

const OwnerDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    goal: '',
    maxContribution: '',
    maxContributor: '',
    endTime: '',

  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const endTimeTimestamp = Math.floor(new Date(form.endTime).getTime() / 1000);
      const duration = endTimeTimestamp - currentTimestamp;

      const goalInWei = Web3.utils.toWei(form.goal.toString(), 'ether');
      const maxContributionInWei = Web3.utils.toWei(form.maxContribution.toString(), 'ether');
      const maxContributor = parseInt(form.maxContributor, 10);

      await createCampaign(form.name, goalInWei, maxContributionInWei, maxContributor.toString(), duration);

      alert('Campaign created successfully and NFT minted!');
    } catch (error) {
      console.error("Error creating campaign or minting NFT", error);
      alert('Error creating campaign or minting NFT');
    }
  };
  
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const endTimeTimestamp = Math.floor(new Date(form.endTime).getTime() / 1000);
        const duration = endTimeTimestamp - currentTimestamp;

        if (duration <= 0) {
            alert("End time must be in the future");
            return;
        }

        const goalInWei = Web3.utils.toWei(form.goal.toString(), 'ether');
        const maxContributionInWei = Web3.utils.toWei(form.maxContribution.toString(), 'ether');
        const maxContributor = parseInt(form.maxContributor, 10);

        await createCampaign(form.name, goalInWei, maxContributionInWei, maxContributor, duration);

        alert('Campaign created successfully!');
    } catch (error) {
        console.error("Error creating campaign", error);
        alert('Error creating campaign');
    }
};


  return (
    <div className="p-4 sm:p-6 md:p-9">
      <h1 className="text-xl sm:text-2xl font-bold">Owner Dashboard</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Goal (USDT)</label>
          <input
            type="number"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Max Contribution (USDT)</label>
          <input
            type="number"
            name="maxContribution"
            value={form.maxContribution}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Max Contributors</label>
          <input
            type="number"
            name="maxContributor"
            value={form.maxContributor}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="date"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className='flex justify-between'>
          <button
            type="button"
            onClick={handleCreateCampaign}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerDashboard;