import { Balance, BlockNumberByTimestamp, Timeframe } from "@/types/portfolio";
import { getBalance } from "@wagmi/core";
import config from "@/config/rainbow";
import moment from "moment";
import { datesFormatByTimeframe } from "@/utils/portfolio";
import {
  mockLast24hBlocks,
  mockLastMonthBlocks,
  mockLastSevenDaysBlocks,
  mockLastYearBlocks,
} from "@/mocks/portfolioBalance";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useGetPortfolioBalance = (timeframe: Timeframe = "1W") => {
  const { address, isConnecting } = useAccount();
  const [portfolioBalance, setPortfolioBalance] = useState<Balance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | undefined>();

  const getBalancesByBlockNumbers = useCallback(
    async (
      blockNumbersByTimestamp: BlockNumberByTimestamp[],
      timeframe: Timeframe
    ): Promise<Balance[]> => {
      const balances: Balance[] = [];

      if (!address) {
        console.error("Can't fetch from empty address");
        return balances;
      }

      for (const trace of blockNumbersByTimestamp) {
        const balance = await getBalance(config, {
          address: address,
          blockNumber: BigInt(trace.blockNumber),
        });

        balances.unshift({
          balance: balance.formatted,
          date: moment(trace.timestamp).format(
            datesFormatByTimeframe[timeframe]
          ),
        });
      }

      return balances;
    },
    [address]
  );

  const getPortfolioBalance = useCallback(
    async (timeframe: Timeframe) => {
      // const timestamps = generateTimeStampsByTimeFrame(timeframe);
      //console.log("timestamps", timestamps);
      // const blockNumberByTimeStamps = await getBlockNumberByTimestamp(
      //   timestamps
      // );

      // console.log("blockNumberByTimeStamps", blockNumberByTimeStamps);

      // const balance = await getBalancesByBlockNumbers(
      //   blockNumberByTimeStamps,
      //   timeframe
      // );
      setIsLoading(true);

      let balance: Balance[] = [];
      // Temporary for mocks, delete this on prod
      switch (timeframe) {
        case "1D":
          balance = await getBalancesByBlockNumbers(
            mockLast24hBlocks,
            timeframe
          );
          break;
        case "1W":
          balance = await getBalancesByBlockNumbers(
            mockLastSevenDaysBlocks,
            timeframe
          );
          break;
        case "1M":
          balance = await getBalancesByBlockNumbers(
            mockLastMonthBlocks,
            timeframe
          );
          break;
        case "1Y":
          balance = await getBalancesByBlockNumbers(
            mockLastYearBlocks,
            timeframe
          );
          break;
      }

      setIsLoading(false);
      setPortfolioBalance(balance);
    },
    [getBalancesByBlockNumbers]
  );

  useEffect(() => {
    if (!address || isConnecting || !timeframe) {
      return;
    }

    getPortfolioBalance(timeframe);
  }, [address, getPortfolioBalance, isConnecting, timeframe]);

  return { portfolioBalance, isLoading };
};
