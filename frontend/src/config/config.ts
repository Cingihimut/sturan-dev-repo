import { walletConnect } from "@wagmi/connectors";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
});

export const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: custom(window.ethereum!),
});

export async function getAccount() {
    const [account] = await walletClient.getAddresses();
    return account;
}
