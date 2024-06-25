"use client"
import { mintNftCampaign } from '@/app/utils/nftService';
import React, { useState } from 'react';

const CreateNft = () => {
  const [status, setStatus] = useState('');

  const [form, setForm] = useState({
    campaignId: '',
    amount: '',
    uri: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Minting...');
    try {
      const result = await mintNftCampaign({ 
        campaignId: parseInt(form.campaignId, 10), 
        amount: form.amount, 
        data: "0x0", 
        uri: form.uri 
      });
      console.log("Minting result:", result);
      setStatus('NFT minted successfully!');
      setForm({ campaignId: '', amount: '', uri: '' });
    } catch (error) {
      console.error("Error minting NFT:", error);
      setStatus(`Error minting NFT: ${error.message}`);
    }
  };

  const handleMintNft = async(e) => {
    e.preventDefault();
    setStatus('Minting...');
    try {
      const result = await mintNftCampaign({ 
        campaignId: parseInt(form.campaignId, 10), 
        amount: form.amount, 
        data: "0x", 
        uri: form.uri 
      });
      console.log("Minting result:", result);
      setStatus('NFT minted successfully!');
      setForm({ campaignId: '', amount: '', uri: '' }); // Reset form after successful minting
    } catch (error) {
      console.error("Error minting NFT:", error);
      setStatus(`Error minting NFT: ${error.message}`);
    }
  }

  return (
    <div>
      <h2>Create NFT Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="number" 
            name="campaignId"
            placeholder="Campaign ID" 
            value={form.campaignId} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <input 
            type="number" 
            name="amount"
            placeholder="Amount" 
            value={form.amount} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <input 
            type="text" 
            name="uri"
            placeholder="URI" 
            value={form.uri} 
            onChange={handleChange} 
            required
          />
        </div>
        <button onClick={handleMintNft} type="submit">Mint NFT Campaign</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default CreateNft;