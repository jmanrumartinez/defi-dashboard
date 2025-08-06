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

// WIP: This is a placeholder for the actual assets data

const response = {
  cursor: null,
  page: 0,
  page_size: 100,
  block_number: 23084794,
  result: [
    {
      token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      symbol: "ETH",
      name: "Ether",
      logo: "https://cdn.moralis.io/eth/0x.png",
      thumbnail: "https://cdn.moralis.io/eth/0x_thumb.png",
      decimals: 18,
      balance: "437850000000000",
      possible_spam: false,
      verified_contract: true,
      total_supply: null,
      total_supply_formatted: null,
      percentage_relative_to_total_supply: null,
      security_score: 99,
      balance_formatted: "0.00043785",
      usd_price: 3663.5049973169657,
      usd_price_24hr_percent_change: 2.386831364017011,
      usd_price_24hr_usd_change: 85.5105640539,
      usd_value: 1.6040656630752335,
      usd_value_24hr_usd_change: 0.03744080047100011,
      native_token: true,
      portfolio_percentage: 100,
    },
  ],
};

export const YourAssets = () => {
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
          {response.result.map((asset) => (
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
              <TableCell>{asset.portfolio_percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
};
