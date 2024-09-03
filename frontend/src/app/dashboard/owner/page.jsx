"use client";

import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useCreateCampaign } from "../../utils/ethers";

const OwnerDashboard = () => {

  const createCampaign = useCreateCampaign()

  const [form, setForm] = useState({
    name: "",
    goal: "",
    maxContribution: "",
    maxContributor: "",
    endTime: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateCampaign = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const durationInSeconds = Math.floor((new Date(form.endTime).getTime() / 1000) - (new Date().getTime() / 1000));
  
      if (!form.name || !form.goal || !form.maxContribution || !form.maxContributor || durationInSeconds <= 0) {
        alert("Please fill out all fields correctly.");
        return;
      }
  
      try {
        await createCampaign(
          form.name,
          ethers.utils.parseUnits(form.goal, 18), // Konversi string menjadi BigInt
          ethers.utils.parseUnits(form.maxContribution, 18), // Konversi string menjadi BigInt
          BigInt(form.maxContributor), // Pastikan ini adalah BigInt
          BigInt(durationInSeconds) // Pastikan ini juga BigInt
        );
        alert("Campaign created successfully");
      } catch (error) {
        console.error("Error creating campaign", error);
        alert("Failed to create campaign");
      }
    } else {
      alert("Please install MetaMask first");
    }
  };  

  return (
    <div className="p-4 sm:p-6 md:p-9">
      <h1 className="text-xl sm:text-2xl font-bold">Owner Dashboard</h1>
      <form onSubmit={(e) => e.preventDefault()} className="mt-4">
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
          <label className="block text-sm font-medium text-gray-700">Goal (USDCS)</label>
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
          <label className="block text-sm font-medium text-gray-700">Max Contribution (USDCS)</label>
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
