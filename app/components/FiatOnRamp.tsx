"use client";

import React from 'react';
import {Transak, TransakConfig} from '@transak/transak-sdk';

export default function FiatOnRamp() {
  const openTransak = () => {
    const transak = new Transak({
      apiKey: 'YOUR_API_KEY', // Replace with your Transak API key
      environment: Transak.ENVIRONMENTS.STAGING, // Use Environments.PRODUCTION for live
      walletAddress: '0xYourWalletAddress', // Replace with the user's wallet address
      themeColor: 'blue',
    });

    transak.init();
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log('Transak Order Successful:', orderData);
      transak.close();
    });
  };

  return (
    <button
      onClick={openTransak}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Fund Wallet with Fiat
    </button>
  );
}