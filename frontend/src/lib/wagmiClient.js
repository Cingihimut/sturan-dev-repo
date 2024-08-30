import { projectId } from "../../config";

const { createClient, http } = require("viem");
const { baseSepolia } = require("viem/chains");
const { createConfig } = require("wagmi");

export const { provider } = createConfig({
    chains: [baseSepolia],
    connectors: [
        walletConnect({
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID
        })
    ],
    transports: {
        [baseSepolia]: http()
    }
})