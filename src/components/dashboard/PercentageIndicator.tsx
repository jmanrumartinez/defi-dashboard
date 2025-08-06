import { CircleChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export const PercentageIndicator = ({ value }: { value: number }) => {
  return (
    <p
      className={cn("text-sm text-gray-500 flex items-center gap-1", {
        "text-emerald-500": value > 0,
        "text-red-400": value < 0,
      })}
    >
      <CircleChevronDown
        className={cn("w-4 h-4", {
          "rotate-180": value > 0,
          "rotate-270": value === 0,
        })}
      />
      {value}%
    </p>
  );
};
