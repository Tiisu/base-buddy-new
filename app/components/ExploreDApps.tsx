"use client";

import React from 'react';

const dApps = [
  { name: 'BaseSwap', url: 'https://baseswap.io', description: 'Swap tokens easily.' },
  { name: 'BaseNFT', url: 'https://basenft.io', description: 'Explore NFTs on Base.' },
];

export default function ExploreDApps() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Explore Base dApps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dApps.map((dApp) => (
          <div key={dApp.name} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-bold">{dApp.name}</h3>
            <p className="text-gray-600">{dApp.description}</p>
            <a
              href={dApp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Try it!
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}