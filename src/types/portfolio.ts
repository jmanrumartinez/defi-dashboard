export type Balance = {
  date: string;
  balance: string;
};

export type BlockNumberByTimestamp = { blockNumber: number; timestamp: string };

export type Timeframe = "1D" | "1W" | "1M" | "1Y";
