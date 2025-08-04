"use client";

import * as React from "react";
import {
  Wallet,
  LayoutDashboard,
  Coins,
  Clock,
  Send,
  History,
  Settings,
  Moon,
  Sun,
  DollarSign,
  Globe,
  ChevronDown,
  TrendingUp,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

const accountSettings = [
  {
    title: "Default Currency",
    url: "#",
    icon: DollarSign,
    action: "USD",
  },
  {
    title: "Change Language",
    url: "#",
    icon: Globe,
    action: "EN",
  },
];

export function DashboardSidebar() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [currency, setCurrency] = React.useState("USD");
  const [language, setLanguage] = React.useState("EN");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const connectWallet = () => {
    setIsConnected(!isConnected);
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">DeFi Dashboard</span>
            <span className="text-xs text-muted-foreground">v2.1.0</span>
          </div>
        </div>

        <Button
          onClick={connectWallet}
          className={`w-full ${
            isConnected ? "bg-green-600 hover:bg-green-700" : ""
          }`}
          variant={isConnected ? "default" : "outline"}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </Button>
      </SidebarHeader>

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
          <Collapsible className="list-none">
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
                      <button onClick={toggleTheme} className="w-full">
                        {isDark ? (
                          <Sun className="mr-3 h-4 w-4" />
                        ) : (
                          <Moon className="mr-3 h-4 w-4" />
                        )}
                        <span>Switch to {isDark ? "Light" : "Dark"} Theme</span>
                      </button>
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
