"use client";

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
  Sun,
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
  Sidebar,
  SidebarContent,
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
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { ToggleThemeButton } from "@/components/shared/ToggleThemeButton";

const navigationItems = [
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

export function DashboardSidebar() {
  const [currency, setCurrency] = React.useState("USD");
  const [language, setLanguage] = React.useState("EN");

  return (
    <Sidebar className="border-r border-border/40">
      <DashboardSidebarHeader />

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a
                      href={item.url}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
    </Sidebar>
  );
}
