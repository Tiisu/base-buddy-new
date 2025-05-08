// app/dashboard/page.tsx
'use client';

import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useRouter } from 'next/navigation';
import { formatEther } from 'viem';

export default function DashboardPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const chain = null; // Replace with appropriate logic if needed

  if (!isConnected) {
    router.push('/');
    return null;
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 dark:bg-zinc-900 dark:text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">👛 Wallet Info</h2>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Network:</strong> Not available</p>
          <p><strong>Balance:</strong> {balanceData ? `${formatEther(balanceData.value)} ${balanceData.symbol}` : 'Loading...'}</p>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
          <h2 className="text-xl font-semibold mb-2">🎯 Onboarding Tasks</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>✅ Connect Wallet</li>
            <li>⬜ Switch to Base Network</li>
            <li>⬜ Complete first transaction</li>
            <li>⬜ Mint an NFT (optional)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
