"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";

const config = getDefaultConfig({
  appName: "DeFi Dashboard",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "",
  chains: [mainnet],
  ssr: true,
});

export default config;
