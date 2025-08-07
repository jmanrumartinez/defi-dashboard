"use client";

import { fetchWalletTokenBalances } from "@/actions/fetchWalletTokenBalances";
import { mockTokenWalletBalances } from "@/mocks/tokenWalletBalances";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useGetWalletTokenBalances = () => {
  const { address, isConnecting } = useAccount();

  const { data, isLoading } = useQuery({
    queryKey: ["walletTokenBalances", address],
    queryFn: () => {
      if (!address) throw new Error("Address is required");

      if (process.env.NEXT_PUBLIC_USE_API_MOCKS === "true") {
        return mockTokenWalletBalances;
      }

      return fetchWalletTokenBalances(address);
    },
    enabled: Boolean(address && !isConnecting),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
  });

  return { data, isLoading };
};
