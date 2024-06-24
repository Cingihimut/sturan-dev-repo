"use client"
import React, { useState } from 'react';
import { mintNftCampaign } from '@/app/utils/nftService';

const CreateNft = () => {
    const [campaignId, setCampaignId] = useState('');
    const [amount, setAmount] = useState('');
    const [uri, setUri] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleMint = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await mintNftCampaign({
                campaignId: parseInt(campaignId),
                amount: parseInt(amount),
                data: '0x',
                uri
            });
            setSuccess(`NFT berhasil di-mint. Transaction hash: ${result.transactionHash}`);
        } catch (err) {
            setError(`Gagal minting NFT: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-nft-container">
            <h2>Mint NFT Kampanye</h2>
            <form onSubmit={handleMint}>
                <div>
                    <label htmlFor="campaignId">ID Kampanye:</label>
                    <input
                        type="number"
                        id="campaignId"
                        value={campaignId}
                        onChange={(e) => setCampaignId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Jumlah:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="uri">URI Metadata:</label>
                    <input
                        type="text"
                        id="uri"
                        value={uri}
                        onChange={(e) => setUri(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Minting...' : 'Mint NFT'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CreateNft;