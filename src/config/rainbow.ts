"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, mainnet } from "viem/chains";

const config = getDefaultConfig({
  appName: "DeFi Dashboard",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "",
  chains: [mainnet, base],
  ssr: true,
});

export default config;
