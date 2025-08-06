import { Timeframe } from "@/types/portfolio";
import moment from "moment";

export const datesFormatByTimeframe: Record<Timeframe, string> = {
  "1D": "MMM D h:mm",
  "1W": "MMM D",
  "1M": "MMM D",
  "1Y": "MMM",
};

export const generateTimeStampsByTimeFrame = (
  timeframe: Timeframe
): number[] => {
  const timestamps: number[] = [];

  const today = moment(new Date());

  if (timeframe === "1D") {
    for (let i = 0; i < 24; i++) {
      const date = moment(today).subtract(i, "hour");
      date.minute(0);
      date.second(0);
      timestamps.push(date.unix());
    }
  }

  if (timeframe === "1W") {
    for (let i = 0; i < 7; i++) {
      const date = moment(today).subtract(i, "days");
      date.hour(0);
      date.minute(0);
      date.second(0);
      timestamps.push(date.unix());
    }
  }

  if (timeframe === "1M") {
    for (let i = 0; i < 30; i++) {
      const date = moment(today).subtract(i, "days");
      date.hour(0);
      date.minute(0);
      date.second(0);
      timestamps.push(date.unix());
    }
  }

  if (timeframe === "1Y") {
    for (let i = 0; i < 12; i++) {
      const date = moment(today).subtract(i, "month");
      date.hour(0);
      date.minute(0);
      date.second(0);
      timestamps.push(date.unix());
    }
  }

  return timestamps;
};
