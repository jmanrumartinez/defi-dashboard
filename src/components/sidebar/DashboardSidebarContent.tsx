import { SidebarContent } from "@/components/ui/sidebar";

import * as React from "react";
import {
  LayoutDashboard,
  Coins,
  Send,
  History,
  Settings,
  DollarSign,
  Globe,
  ChevronDown,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ToggleThemeButton } from "@/components/shared/ToggleThemeButton";
import { DashboardNavItem, DashboardNavItemType } from "./DashboardNavItem";

const navigationItems: DashboardNavItemType[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Assets",
    url: "#",
    icon: Coins,
  },
  {
    title: "Send Money",
    url: "#",
    icon: Send,
  },
  {
    title: "Transaction History",
    url: "#",
    icon: History,
  },
];

export const DashboardSidebarContent = () => {
  const [currency, setCurrency] = React.useState("ETH");
  const [language, setLanguage] = React.useState("EN");

  return (
    <SidebarContent className="px-2 py-4">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <DashboardNavItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator className="my-4" />

      <SidebarGroup>
        <Collapsible defaultOpen className="list-none">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between">
                <div className="flex items-center">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Account Settings</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="list-none">
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild className="gap-0">
                    <ToggleThemeButton />
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuSubButton className="w-full justify-between">
                        <div className="flex items-center">
                          <DollarSign className="mr-3 h-4 w-4" />
                          <span>Default Currency</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {currency}
                        </span>
                      </SidebarMenuSubButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setCurrency("USD")}>
                        USD - US Dollar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrency("EUR")}>
                        EUR - Euro
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrency("ETH")}>
                        ETH - Ethereum
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrency("BTC")}>
                        BTC - Bitcoin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuSubButton className="w-full justify-between">
                        <div className="flex items-center">
                          <Globe className="mr-3 h-4 w-4" />
                          <span>Change Language</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {language}
                        </span>
                      </SidebarMenuSubButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setLanguage("EN")}>
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage("ES")}>
                        Español
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarGroup>
    </SidebarContent>
  );
};
