"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { DashboardSidebarContent } from "./DashboardSidebarContent";

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-border/40">
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
    </Sidebar>
  );
}
