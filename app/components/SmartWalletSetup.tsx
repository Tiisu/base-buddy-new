"use client";

import React, { useEffect, useState } from 'react';
import { createSmartAccountClient } from '@biconomy/account';
import { ethers } from 'ethers';

export default function SmartWalletSetup() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupSmartWallet() {
      try {
        setIsLoading(true);

        // Check if window.ethereum is available
        if (!window.ethereum) {
          setError("MetaMask or another web3 wallet is required");
          setIsLoading(false);
          return;
        }

        // Get the provider and signer from window.ethereum
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Get the chain ID from the provider
        const { chainId } = await provider.getNetwork();

        // Create Biconomy smart account client
        interface Signer {
          getAddress: () => Promise<`0x${string}`>;
          signMessage: (message: string) => Promise<`0x${string}`>;
        }

        interface SmartAccountClientConfig {
          signer: Signer;
          chainId: number;
          bundlerUrl: string;
        }

        const smartAccount = await createSmartAccountClient({
          signer: {
            getAddress: async (): Promise<`0x${string}`> => signer.address as `0x${string}`,
            signMessage: async (message: string): Promise<`0x${string}`> => {
              return await signer.signMessage(message) as `0x${string}`;
            }
          },
          chainId: Number(chainId),
          bundlerUrl: "https://bundler.biconomy.io/api/v2/8453/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44", // Base network bundler URL
        } as SmartAccountClientConfig);

        // Get the smart account address
        const saAddress = await smartAccount.getAccountAddress();
        setWalletAddress(saAddress);
        setIsLoading(false);
      } catch (error) {
        console.error("Error setting up smart wallet:", error);
        setError("Failed to set up smart wallet. Please make sure you're connected to the Base network.");
        setIsLoading(false);
      }
    }

    setupSmartWallet();
  }, []);

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-2">Smart Wallet Setup</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : isLoading ? (
        <p className="text-gray-600">Setting up your smart wallet...</p>
      ) : walletAddress ? (
        <div>
          <p className="text-green-600">Smart Wallet Created!</p>
          <p className="text-gray-700">Address: <span className="font-mono text-sm">{walletAddress}</span></p>
        </div>
      ) : null}
    </div>
  );
}