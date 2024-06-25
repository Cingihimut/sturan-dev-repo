import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('.api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setIpfsHash(data.ipfsHash);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload to IPFS</button>
      </form>

      {ipfsHash && (
        <div>
          <p>IPFS Hash: {ipfsHash}</p>
        </div>
      )}
    </div>
  );
}
