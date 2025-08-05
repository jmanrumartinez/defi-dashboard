import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

export type DashboardNavItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export const DashboardNavItem = ({ item }: { item: DashboardNavItemType }) => {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={item.isActive}>
        <Link href={item.url} className="flex items-center justify-between">
          <div className="flex items-center">
            <item.icon className="mr-3 h-4 w-4" />
            <span>{item.title}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
