"use client";

import { CircleChevronDown } from "lucide-react";
import { AreaChart } from "@/components/ui/area-chart";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { cn } from "@/utils/cn";
import { useAccount, useBalance } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";

import { Timeframe } from "@/types/portfolio";
import { useGetPortfolioBalance } from "@/hooks/useGetPortfolioBalance";
import { AreaChartSkeleton } from "@/components/portfolio/AreaChartSkeleton";
import { SectionCard } from "@/components/shared/SectionCard";
import { TimeframeButton } from "./TimeframeButton";
import { calculatePercentageChange } from "@/utils/portfolio";
import { PercentageIndicator } from "./PercentageIndicator";

export const timeframeValues: Timeframe[] = ["1D", "1W", "1M", "1Y"];

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

  const percentageChange =
    portfolioBalance && portfolioBalance?.length > 1
      ? calculatePercentageChange(portfolioBalance).toFixed(2)
      : 0;

  return (
    <SectionCard>
      <div className="flex flex-col gap-2">
        <SectionCard.Title>Portfolio Balance</SectionCard.Title>
        <div className="lg:flex justify-between items-center hidden">
          {isConnecting || isBalanceLoading ? (
            <Skeleton className="w-lg h-8" />
          ) : (
            <h3 className="text-4xl font-bold">
              {balance?.formatted} {balance?.symbol}
            </h3>
          )}

          <div className="flex gap-2">
            {timeframeValues.map((timeframe: Timeframe) => (
              <TimeframeButton
                key={timeframe}
                timeframe={timeframe}
                isSelected={timeframeSelected === timeframe}
                onClick={handleSelectTimeframe}
              />
            ))}
          </div>
        </div>
        <PercentageIndicator value={Number(percentageChange)} />
      </div>
      {isPortfolioBalanceLoading || !portfolioBalance ? (
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
    </SectionCard>
  );
};
