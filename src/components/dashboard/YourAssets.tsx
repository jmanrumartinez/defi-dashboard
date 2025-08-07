"use client";
import { SectionCard } from "@/components/shared/SectionCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { PercentageIndicator } from "./PercentageIndicator";
import { useGetWalletTokenBalances } from "@/hooks/useGetWalletTokenBalances";
import { YourAssetsTableRowSkeleton } from "../assets/TableBodySkeleton";

export const YourAssets = () => {
  const { data, isLoading } = useGetWalletTokenBalances();

  return (
    <SectionCard>
      <SectionCard.Title>Your Assets</SectionCard.Title>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h Price Change</TableHead>
            <TableHead>Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || !data ? (
            <YourAssetsTableRowSkeleton numberOfRows={3} />
          ) : (
            data?.result.map((asset) => (
              <TableRow key={asset.token_address}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Image
                      src={asset.logo}
                      alt={asset.symbol}
                      width={20}
                      height={20}
                    />
                    <div className="flex flex-col">
                      <p className="text-md font-medium">{asset.symbol}</p>
                      <p className="text-sm text-gray-500">{asset.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-md font-medium">
                      ${asset.usd_value.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {asset.balance_formatted} {asset.symbol}
                    </p>
                  </div>
                </TableCell>
                <TableCell>${asset.usd_price.toFixed(2)}</TableCell>
                <TableCell>
                  <PercentageIndicator
                    value={asset.usd_price_24hr_percent_change}
                  />
                </TableCell>
                <TableCell>{asset.portfolio_percentage.toFixed(2)}%</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </SectionCard>
  );
};
