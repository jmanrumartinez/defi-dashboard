"use client";

import { CircleChevronDown } from "lucide-react";
import { AreaChart } from "@/components/ui/area-chart";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/utils/cn";
import { useAccount, useBalance } from "wagmi";
import { Skeleton } from "../ui/skeleton";

import { Balance, Timeframe } from "@/types/portfolio";
import { useGetPortfolioBalance } from "@/hooks/useGetPortfolioBalance";
import { AreaChartSkeleton } from "../portfolio/AreaChartSkeleton";

export const PortfolioBalance = () => {
  const { address, isConnecting } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  });
  const [timeframeSelected, setTimeframeSelected] = useState<Timeframe>("1W");
  const { portfolioBalance, isLoading: isPortfolioBalanceLoading } =
    useGetPortfolioBalance(timeframeSelected);

  const handleSelectTimeframe = (timeframeSelected: Timeframe) => {
    setTimeframeSelected(timeframeSelected);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6 dark:border-0 dark:bg-[var(--sidebar)]">
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-bold">Portfolio Balance</h2>
        <div className="lg:flex justify-between items-center hidden">
          {isConnecting || isBalanceLoading ? (
            <Skeleton className="w-lg h-8" />
          ) : (
            <h3 className="text-4xl font-bold">
              {balance?.formatted} {balance?.symbol}
            </h3>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className={cn({
                "bg-accent dark:bg-input": timeframeSelected === "1D",
              })}
              onClick={() => handleSelectTimeframe("1D")}
            >
              1D
            </Button>
            <Button
              variant="outline"
              className={cn({
                "bg-accent dark:bg-input": timeframeSelected === "1W",
              })}
              onClick={() => handleSelectTimeframe("1W")}
            >
              1W
            </Button>
            <Button
              variant="outline"
              className={cn({
                "bg-accent dark:bg-input": timeframeSelected === "1M",
              })}
              onClick={() => handleSelectTimeframe("1M")}
            >
              1M
            </Button>
            <Button
              variant="outline"
              className={cn({
                "bg-accent dark:bg-input": timeframeSelected === "1Y",
              })}
              onClick={() => handleSelectTimeframe("1Y")}
            >
              1Y
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <CircleChevronDown className={cn("w-4 h-4")} />
          -1.23%
        </p>
      </div>
      {isPortfolioBalanceLoading ? (
        <AreaChartSkeleton className="-mb-2 mt-8 h-48" />
      ) : (
        <AreaChart
          data={portfolioBalance}
          index="date"
          categories={["balance"]}
          showLegend={false}
          showYAxis={false}
          className="-mb-2 mt-8 h-48"
        />
      )}
    </div>
  );
};
