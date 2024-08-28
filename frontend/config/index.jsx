import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// Create a metadata object
const metadata = {
  name: 'sturan network',
  description: 'Blockchain Crowdfunding',
  url: 'https://sturanet.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [baseSepolia]
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
//   ...wagmiOptions // Optional - Override createConfig parameters
})