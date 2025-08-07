"use server";

import { Address } from "viem";

export type MoralisTokenBalance = {
  token_address: string;
  symbol: string;
  name: string;
  logo: string;
  thumbnail: string;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
  total_supply: string | null;
  total_supply_formatted: string | null;
  percentage_relative_to_total_supply: number | null;
  security_score: number;
  balance_formatted: string;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  usd_value: number;
  usd_value_24hr_usd_change: number;
  native_token: boolean;
  portfolio_percentage: number;
};

type MoralisTokenBalanceResponse = {
  cursor: string | null;
  page: number;
  page_size: number;
  block_number: number;
  result: MoralisTokenBalance[];
};

export const fetchWalletTokenBalances = async (
  address: Address
): Promise<MoralisTokenBalanceResponse> => {
  const response = await fetch(
    `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth`,
    {
      headers: {
        "X-API-Key": process.env.MORALIS_API_KEY ?? "",
      },
    }
  );
  const data: MoralisTokenBalanceResponse = await response.json();
  return data;
};
