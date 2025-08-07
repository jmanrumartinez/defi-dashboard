import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const YourAssetsTableRowSkeleton = ({
  numberOfRows = 5,
}: {
  numberOfRows?: number;
}) => {
  return Array.from({ length: numberOfRows }).map((_, index) => (
    <TableRow key={`skeleton-${index}`}>
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-24 h-3" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-28 h-3" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-12 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-12 h-4" />
      </TableCell>
    </TableRow>
  ));
};
