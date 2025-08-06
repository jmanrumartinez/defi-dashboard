import { Button } from "@/components/ui/button";
import { Timeframe } from "@/types/portfolio";
import { cn } from "@/utils/cn";

export const TimeframeButton = ({
  timeframe,
  isSelected,
  onClick,
}: {
  timeframe: Timeframe;
  isSelected: boolean;
  onClick: (timeframe: Timeframe) => void;
}) => {
  return (
    <Button
      variant="outline"
      className={cn({
        "bg-accent dark:bg-input": isSelected,
      })}
      onClick={() => onClick(timeframe)}
    >
      {timeframe}
    </Button>
  );
};
