import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

require("dotenv").config()
export const projectId = '4f6b26c1c1f5a9397bcc8eea93096f21';

const metadata = {
  name: 'sturan',
  description: 'Blockchain Crowdfunding',
  url: 'https://sturanet.vercel.app/',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [baseSepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})