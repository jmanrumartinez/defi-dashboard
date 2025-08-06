import { cn } from "@/utils/cn";

export const AreaChartSkeleton = (props: Pick<HTMLDivElement, "className">) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "relative w-full bg-gray-50 rounded-lg overflow-hidden",
        className
      )}
    >
      {/* Animated area chart shape */}
      <svg
        className="w-full h-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="skeleton-gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Area chart skeleton path */}
        <path
          d="M0,180 L50,160 L100,140 L150,120 L200,100 L250,80 L300,90 L350,70 L400,60 L400,200 L0,200 Z"
          fill="url(#skeleton-gradient)"
          className="animate-pulse"
        />

        {/* Additional area for stacked effect */}
        <path
          d="M0,180 L50,170 L100,165 L150,155 L200,150 L250,145 L300,148 L350,140 L400,135 L400,200 L0,200 Z"
          fill="#e5e7eb"
          fillOpacity="0.6"
          className="animate-pulse"
          style={{ animationDelay: "0.2s" }}
        />
      </svg>

      {/* Y-axis skeleton lines */}
      <div className="absolute left-0 top-0 h-full w-px bg-gray-200" />

      {/* X-axis skeleton lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />

      {/* Grid lines skeleton */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gray-100"
            style={{ top: `${25 + i * 25}%` }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gray-100"
            style={{ left: `${16.66 + i * 16.66}%` }}
          />
        ))}
      </div>
    </div>
  );
};
