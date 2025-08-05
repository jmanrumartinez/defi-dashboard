import { SidebarHeader } from "@/components/ui/sidebar";
import { ChartArea } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const DashboardSidebarHeader = () => {
  const { t } = useTranslation();

  return (
    <SidebarHeader className="border-b border-border/40 p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <ChartArea className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{t("app_title")}</span>
          <span className="text-xs text-muted-foreground">v0.0.1</span>
        </div>
      </div>

      <ConnectButton />
    </SidebarHeader>
  );
};
