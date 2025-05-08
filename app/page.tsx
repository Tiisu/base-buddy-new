"use client";

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import SmartWalletSetup from './components/SmartWalletSetup';
import FiatOnRamp from './components/FiatOnRamp';
import ExploreDApps from './components/ExploreDApps';

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-600"> Welcome to Base Buddy</h1>
      <p className="text-gray-700 mb-4">Connect your wallet to begin onboarding.</p>
      <ConnectButton />
      {isConnected && (
        <p className="mt-4 text-gray-600">
          Connected Wallet: <span className="font-mono">{address}</span>
        </p>
      )}
      <SmartWalletSetup />
      <FiatOnRamp />
      <ExploreDApps />
      <p className="mt-6 text-gray-700">
        Need tokens? Visit the{' '}
        <a
          href="https://faucet.base.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Base Faucet
        </a>{' '}
        or use the{' '}
        <a
          href="https://bridge.base.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Base Bridge
        </a>.
      </p>
    </main>
  );
}