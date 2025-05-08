import React, { useState } from 'react';

export default function OnboardingTips() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded"
      >
        {isOpen ? 'Hide Tips' : 'Show Tips'}
      </button>
      {isOpen && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold mb-2">Onboarding Tips</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>How to bridge assets to Base</li>
            <li>How to use Base dApps</li>
            <li>Where to find Base faucet</li>
          </ul>
        </div>
      )}
    </div>
  );
}