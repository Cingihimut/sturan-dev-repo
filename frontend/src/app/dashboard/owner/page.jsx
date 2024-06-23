"use client";
import React, { useState } from 'react';
import { createCampaign } from '@/app/utils/contract';
import { mintNewNft } from '@/app/utils/nftService';
import Web3 from 'web3';

const OwnerDashboard = () => {
  const [form, setForm] = useState({
    name: '',
    goal: '',
    maxContribution: '',
    maxContributor: '',
    endTime: '',
    uri_nft: '',
    amount: ''
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

      // Buat kampanye
      await createCampaign(form.name, goalInWei, maxContributionInWei, maxContributor.toString(), duration);

      // Mint NFT baru
      const amount = parseInt(form.amount, 10); // Konversi jumlah NFT ke integer
      await mintNewNft({
        account: '<alamat akun pemilik>', // Ganti dengan alamat akun pemilik
        id: '<ID unik NFT>', // Ganti dengan ID unik NFT yang ingin Anda mint
        _uri: form.uri_nft, // Gunakan URI NFT dari formulir
        data: '' // Data tambahan, bisa kosong jika tidak diperlukan
      });

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

      const goalInWei = Web3.utils.toWei(form.goal.toString(), 'ether');
      const maxContributionInWei = Web3.utils.toWei(form.maxContribution.toString(), 'ether');
      const maxContributor = parseInt(form.maxContributor, 10);

      await createCampaign(form.name, goalInWei, maxContributionInWei, maxContributor.toString(), duration);

      alert('Campaign created successfully!');
    } catch (error) {
      console.error("Error creating campaign", error);
      alert('Error creating campaign');
    }
  };

  const handleMintNft = async (e) => {
    e.preventDefault();
    try {
      const amount = parseInt(form.amount, 10); // Convert NFT amount to integer
  
      // Mint NFT
      await mintNewNft({
        account: '<owner account address>', // Replace with the owner's account address
        amount,
        _uri: form.uri_nft,
        data: '' // Additional data, if needed
      });
  
      alert('NFT minted successfully!');
    } catch (error) {
      console.error("Error minting NFT", error);
      alert('Error minting NFT');
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
            min="0"
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">NFT URI</label>
          <input
            type="text"
            name="uri_nft"
            value={form.uri_nft}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">NFT Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
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
          <button
            type="button"
            onClick={handleMintNft}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Mint NFT
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerDashboard;
