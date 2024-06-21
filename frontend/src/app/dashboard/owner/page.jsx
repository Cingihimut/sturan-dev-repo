"use client";
import React, { useState } from 'react';
import { createCampaign } from '@/app/utils/contract';

const OwnerDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    goal: '',
    maxContribution: '',
    maxContributor: '',
    endTime: ''
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

      await createCampaign(form.name, form.goal, form.maxContribution, form.maxContributor, duration);
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
          <label className="block text-sm font-medium text-gray-700">Goal (XTR)</label>
          <input
            type="number"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Max Contribution (XTR)</label>
          <input
            type="number"
            name="maxContribution"
            value={form.maxContribution}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default OwnerDashboard;