"use client";

import React, { useState, useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  midnightTheme,
  getDefaultWallets,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

import {
  argentWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

import {
  arbitrum,
  base,
  filecoinCalibration,
  hardhat,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
  zora,
} from "wagmi/chains";

const wagmiConfig = getDefaultConfig({
  appName: "RentEvo App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [
        argentWallet,
        trustWallet,
        ledgerWallet,
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],

  chains: [
    arbitrum,
    sepolia,
    polygonMumbai,
    mainnet,
    polygon,
    optimism,
    base,
    zora,
    filecoinCalibration,
    hardhat,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],

  ssr: true,
});

const queryClient = new QueryClient();

const Providers = ({ children, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={wagmiConfig.chains}
          theme={midnightTheme({
            accentColor: "#EAB308", // use of yellow color
            accentColorForeground: "black",
            overlayBlur: "small",
          })}
          locale="es-419"
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
