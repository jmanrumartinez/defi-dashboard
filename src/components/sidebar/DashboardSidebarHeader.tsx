import { SidebarHeader } from "@/components/ui/sidebar";
import { TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const DashboardSidebarHeader = () => {
  const { t } = useTranslation();

  return (
    <SidebarHeader className="border-b border-border/40 p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <TrendingUp className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{t("app_title")}</span>
          <span className="text-xs text-muted-foreground">
            {t("app_version")}
          </span>
        </div>
      </div>

      <Button className={`w-full`} variant={"outline"}>
        <Wallet className="mr-2 h-4 w-4" />
        {t("connect_wallet")}
      </Button>
    </SidebarHeader>
  );
};
