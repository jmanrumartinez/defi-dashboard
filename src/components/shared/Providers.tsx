"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import config from "@/config/rainbow";

const queryClient = new QueryClient();

export const Providers = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string | undefined;
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale as Locale}>
          <SidebarProvider>{children}</SidebarProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
