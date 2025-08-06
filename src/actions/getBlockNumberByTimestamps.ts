"use server";

type MoralisBlockByDateResponse = {
  block: number;
  date: string;
  timestamp: number;
  block_timestamp: string;
  hash: string;
  parent_hash: string;
};

import { BlockNumberByTimestamp } from "@/types/portfolio";

export const getBlockNumberByTimestamps = async (
  timestamps: number[]
): Promise<BlockNumberByTimestamp[]> => {
  const blockNumberByTimestamp: BlockNumberByTimestamp[] = [];

  for (const timestamp of timestamps) {
    const res = await fetch(
      `https://deep-index.moralis.io/api/v2.2/dateToBlock?chain=eth&date=${timestamp}`,
      {
        headers: {
          "x-api-key": process.env.MORALIS_API_KEY ?? "",
        },
      }
    );
    const data: MoralisBlockByDateResponse = await res.json();
    blockNumberByTimestamp.push({
      blockNumber: data.block,
      timestamp: data.block_timestamp,
    });
  }

  return blockNumberByTimestamp;
};
