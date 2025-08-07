import { Balance, BlockNumberByTimestamp, Timeframe } from "@/types/portfolio";
import { getBalance, GetBalanceReturnType } from "@wagmi/core";
import config from "@/config/rainbow";
import moment from "moment";
import {
  datesFormatByTimeframe,
  //generateTimeStampsByTimeframe,
} from "@/utils/portfolio";
import {
  mockLast24hBlocks,
  mockLastMonthBlocks,
  mockLastSevenDaysBlocks,
  mockLastYearBlocks,
} from "@/mocks/portfolioBalance";
import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
// import { getBlockNumberByTimestamps } from "@/actions/getBlockNumberByTimestamps";

export const useGetPortfolioBalance = (timeframe: Timeframe = "1W") => {
  const { address, isConnecting } = useAccount();

  const { data: portfolioBalance, isLoading } = useQuery({
    queryKey: ["fetchPortfolioBalance", address, timeframe],
    queryFn: () => getPortfolioBalance(timeframe),
    enabled: Boolean(address && !isConnecting && timeframe),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2,
  });

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

      const getBalancePromises: Promise<GetBalanceReturnType>[] = [];

      for (const blockInfo of blockNumbersByTimestamp) {
        const promise = getBalance(config, {
          address,
          blockNumber: BigInt(blockInfo.blockNumber),
        });

        getBalancePromises.push(promise);
      }

      const balancesResponse = await Promise.all(getBalancePromises);

      balancesResponse.forEach((balance, i) => {
        balances.unshift({
          balance: balance.formatted,
          date: moment
            .utc(blockNumbersByTimestamp[i].timestamp)
            .format(datesFormatByTimeframe[timeframe]),
        });
      });

      return balances;
    },
    [address]
  );

  const getPortfolioBalance = useCallback(
    async (timeframe: Timeframe) => {
      //   const timestamps = generateTimeStampsByTimeframe(timeframe);
      //   const blockNumberByTimeStamps = await getBlockNumberByTimestamps(
      //     timestamps
      //   );
      //   const balance = await getBalancesByBlockNumbers(
      //     blockNumberByTimeStamps,
      //     timeframe
      //   );

      let balance: Balance[] = [];
      // TODO: Temporary for mocks to avoid calling the API, delete this on production
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

      return balance;
    },
    [getBalancesByBlockNumbers]
  );

  return { portfolioBalance, isLoading };
};
