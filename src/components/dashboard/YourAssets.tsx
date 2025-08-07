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
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import Image from "next/image";
import { PercentageIndicator } from "./PercentageIndicator";
import { useGetWalletTokenBalances } from "@/hooks/useGetWalletTokenBalances";
import { YourAssetsTableRowSkeleton } from "../assets/TableBodySkeleton";
import { useTranslation } from "react-i18next";
import { MoralisTokenBalance } from "@/actions/fetchWalletTokenBalances";
import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";

export const YourAssets = () => {
  const { data, isLoading } = useGetWalletTokenBalances();
  const { t } = useTranslation("dashboard");
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "balance_formatted",
      desc: true,
    },
  ]);

  const columnHelper = createColumnHelper<MoralisTokenBalance>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<MoralisTokenBalance, any>[] = useMemo(
    () => [
      columnHelper.accessor("symbol", {
        header: t("dashboard.yourAssets.table.asset"),
        cell: ({ cell, row }) => (
          <div className="flex items-center gap-2">
            <Image
              src={row.original.logo}
              alt={row.original.name}
              width={20}
              height={20}
            />
            <div className="flex flex-col">
              <p className="text-md font-medium">{cell.getValue()}</p>
              <p className="text-sm text-gray-500">{row.original.name}</p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("balance_formatted", {
        header: t("dashboard.yourAssets.table.balance"),
        cell: ({ cell, row }) => (
          <div className="flex flex-col">
            <p className="text-md font-medium">
              {cell.getValue()} {row.getValue("symbol")}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              ${row.original.usd_value.toFixed(2)}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("usd_price", {
        header: t("dashboard.yourAssets.table.price"),
        cell: ({ cell }) => `$${cell.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor("usd_price_24hr_percent_change", {
        header: t("dashboard.yourAssets.table.priceChange"),
        cell: ({ cell }) => <PercentageIndicator value={cell.getValue()} />,
      }),
      columnHelper.accessor("portfolio_percentage", {
        header: t("dashboard.yourAssets.table.allocation"),
        cell: ({ cell }) => `${cell.getValue().toFixed(2)}%`,
      }),
    ],
    [columnHelper, t]
  );

  const table = useReactTable({
    data: data?.result ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    enableSortingRemoval: false,
  });

  return (
    <SectionCard>
      <SectionCard.Title>{t("dashboard.yourAssets.title")}</SectionCard.Title>
      <Table className="mt-4">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={cn({
                    "cursor-pointer select-none": header.column.getCanSort(),
                  })}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted() as string] ?? null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading || !data ? (
            <YourAssetsTableRowSkeleton numberOfRows={3} />
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </SectionCard>
  );
};
