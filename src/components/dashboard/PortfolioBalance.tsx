"use client";

import { CircleChevronDown } from "lucide-react";
import { AreaChart } from "@/components/ui/area-chart";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DataItem {
  date: string;
  revenue: number;
}

const data: DataItem[] = [
  { date: "Jan 23", revenue: 2340 },
  { date: "Feb 23", revenue: 3110 },
  { date: "Mar 23", revenue: 4643 },
  { date: "Apr 23", revenue: 4650 },
  { date: "May 23", revenue: 3980 },
  { date: "Jun 23", revenue: 4702 },
  { date: "Jul 23", revenue: 5990 },
  { date: "Aug 23", revenue: 5700 },
  { date: "Sep 23", revenue: 4250 },
  { date: "Oct 23", revenue: 4182 },
  { date: "Nov 23", revenue: 3812 },
  { date: "Dec 23", revenue: 4900 },
];

export const PortfolioBalance = () => {
  const [datas, setDatas] = useState(null);

  return (
    <div className="rounded-lg border-[1px] border-gray-200 p-6">
      <h2 className="text-md font-bold">Portfolio Balance</h2>
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-bold">$2.65</h3>

        <div className="flex gap-2">
          <Button variant="outline">1H</Button>
          <Button variant="outline">1D</Button>
          <Button variant="outline">1W</Button>
          <Button variant="outline">1M</Button>
          <Button variant="outline">1Y</Button>
          <Button variant="outline">All</Button>
        </div>
      </div>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <CircleChevronDown className="w-4 h-4" />
        -1.23%
      </p>
      <AreaChart
        data={data}
        index="date"
        categories={["revenue"]}
        showLegend={false}
        showYAxis={false}
        startEndOnly={true}
        className="-mb-2 mt-8 h-48"
        tooltipCallback={(props) => {
          if (props.active) {
            setDatas((prev) => {
              if (prev?.label === props.label) return prev;
              return props;
            });
          } else {
            setDatas(null);
          }
          return null;
        }}
      />
    </div>
  );
};
