import { NextApiRequest, NextApiResponse } from 'next';
import pinataSDK from '@pinata/sdk';
import multer from 'multer';
import nextConnect from 'next-connect';

const PINATA_API_KEY = process.env
const PINATA_SECRECT_KEY = process.env

const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRECT_KEY);

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  const file = req.file;

  try {
    const options = {
      pinataMetadata: {
        name: 'Your NFT Name',
        keyvalues: {
          customKey: 'customValue'
        }
      },
      pinataOptions: {
        cidVersion: 0
      }
    };

    const result = await pinata.pinFileToIPFS(file.buffer, options);

    res.status(200).json({ ipfsHash: result.IpfsHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so `multer` can handle it
  },
};
