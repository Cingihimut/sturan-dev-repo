"use client"
import React, { useState } from 'react';
import { useCreateCampaign, useIsOwner } from '../../utils/contract';

const OwnerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    goal: "",
    maxContribution: "",
    maxContributor: "",
    endTime: ""
  });

  const { createCampaign, isLoading, isSuccess, error } = useCreateCampaign();
  const isOwner = useIsOwner();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = async () => {
    if (!isOwner) {
      alert("Only the owner can create campaigns");
      return;
    }
    
    try {
      await createCampaign(
        form.name,
        form.goal,
        form.maxContributor,
        form.maxContribution,
        form.endTime
      );
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-9">
      <h1 className="text-xl sm:text-2xl font-bold">Owner Dashboard</h1>
      {!isOwner && <p className="text-red-500 mt-2">You are not the owner of this contract.</p>}
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
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleClick}
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading || !isOwner}
          >
            {isLoading ? "Creating..." : "Add Campaign"}
          </button>
        </div>
      </form>
      {isSuccess && <p className="text-green-500">Campaign created successfully!</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default OwnerDashboard;