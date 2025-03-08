// src/app/doc/layout.tsx
import React from "react";
import Link from "next/link";
import { allDocs } from "contentlayer/generated";
import SearchDialog from "@/components/search-dialog";

import {
  SidebarProvider,
  SidebarLayout,
  MainContent,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeaderLogo,
  Title,
  UserAvatar,
  UserInfo,
  NestedLink,
} from "@/components/sidebar/v0-claude-sidebar-1"
import { Home, Users, Settings, FileText, BarChart, Mail, Bell, BookOpen } from "lucide-react"

import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout>
      {/* Left Sidebar Provider */}
      <SidebarProvider defaultOpen={true} defaultSide="left" defaultMaxWidth={280} showIconsOnCollapse={true}>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLogo />
            <Title>My App</Title>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem icon={<Home className="h-5 w-5" />} label="Dashboard" href="/" />
              <SidebarMenuItem icon={<Users className="h-5 w-5" />} label="Users" defaultOpen={true}>
                <NestedLink href="/users">User List</NestedLink>
                <NestedLink href="/users/groups">User Groups</NestedLink>
              </SidebarMenuItem>
              <SidebarMenuItem isActive={true} icon={<FileText className="h-5 w-5" />} label="Documents" href="/documents" />
              <SidebarMenuItem icon={<BarChart className="h-5 w-5" />} label="Analytics" href="/analytics" />
              <SidebarMenuItem icon={<Mail className="h-5 w-5" />} label="Messages" href="/messages" />
              <SidebarMenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" alwaysOpen={true}>
                <NestedLink href="/notifications">All Notifications</NestedLink>
                <NestedLink href="/notifications/mentions">Mentions</NestedLink>
                <NestedLink href="/notifications/settings">Settings</NestedLink>
              </SidebarMenuItem>
              <SidebarMenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" alwaysOpen={true}>
                <NestedLink href="/notifications">All Notifications</NestedLink>
                <NestedLink href="/notifications/mentions">Mentions</NestedLink>
                <NestedLink href="/notifications/settings">Settings</NestedLink>
              </SidebarMenuItem>
              <SidebarMenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" alwaysOpen={true}>
                <NestedLink href="/notifications">All Notifications</NestedLink>
                <NestedLink href="/notifications/mentions">Mentions</NestedLink>
                <NestedLink href="/notifications/settings">Settings</NestedLink>
              </SidebarMenuItem>
              <SidebarMenuItem icon={<Settings className="h-5 w-5" />} label="Settings" href="/settings" />
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <UserAvatar />
            <UserInfo />
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Header className="justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">
                My Documentation
              </h1>
            </div>
            <div className="flex gap-2">
              <ModeToggle />
              <SearchDialog searchData={allDocs} />
            </div>
          </Header>
          <div className="flex-1 p-8">{children}</div>
        </MainContent>

      </SidebarProvider>

      {/* Right Sidebar Provider */}
      {/* <SidebarProvider defaultOpen={false} defaultSide="right" defaultMaxWidth={300} showIconsOnCollapse={true}>
        <Sidebar>
          <SidebarHeader>
            <SidebarTrigger />
            <Title>Documentation</Title>
            <BookOpen className="h-5 w-5" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem icon={<BookOpen className="h-5 w-5" />} label="Getting Started" href="/docs/getting-started" />
              <SidebarMenuItem icon={<Settings className="h-5 w-5" />} label="Configuration" href="/docs/configuration" />
              <SidebarMenuItem icon={<FileText className="h-5 w-5" />} label="API Reference" defaultOpen={true}>
                <NestedLink href="/docs/api/overview">Overview</NestedLink>
                <NestedLink href="/docs/api/endpoints">Endpoints</NestedLink>
                <NestedLink href="/docs/api/authentication">Authentication</NestedLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="text-sm text-gray-500">v1.0.0</div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider> */}
    </SidebarLayout>
  );
}