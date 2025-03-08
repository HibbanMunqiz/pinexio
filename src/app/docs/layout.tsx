// src/app/doc/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { allDocs } from "contentlayer/generated";
import SearchDialog from "@/components/search-dialog";
import { configDocs } from "config/docs";
import Image from "next/image";
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
import { Home, Users, Settings, FileText, BarChart, Mail, Bell, BookOpen, Component } from "lucide-react"

import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import Divider from "@/components/divider";

// Group docs into top-level and nested by folder
function groupDocs(docs: any[]) {
  const topDocs: any[] = [];
  const folderGroups: { [key: string]: any[] } = {};

  docs.forEach((doc) => {
    // If the file is in the root, push to topDocs
    if (doc._raw.sourceFileDir === ".") {
      topDocs.push(doc);
    } else {
      // Use the folder name from sourceFileDir (e.g. "getting-started")
      const folder = doc._raw.sourceFileDir;
      if (!folderGroups[folder]) {
        folderGroups[folder] = [];
      }
      folderGroups[folder].push(doc);
    }
  });

  return { topDocs, folderGroups };
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { topDocs, folderGroups } = groupDocs(allDocs);
  // Destructure sidebarNav from configDocs
  const { sidebarNav } = configDocs;
  console.log('layout is called')
  // Sample data structure
  const quickReference = [
    {
      title: "Installation",
      href: "docs/components/installation#installation-guide",
      pages: [
        {
          title: "Props",
          href: "/docs/getting-started/introduction",
        },
      ],
    },
  ]
  return (
    <SidebarLayout>
      {/* Left Sidebar Provider */}
      <SidebarProvider defaultOpen={true} defaultSide="left" defaultMaxWidth={280} showIconsOnCollapse={true}>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLogo logo={<Image alt="logo" className={'h-auto w-aut dark:invert'} width={30} height={30} 
            src={`/logos/pinedocs.png`} />} />

            <Title>PINE<span className="text-3xl">D</span>OCS</Title>
          </SidebarHeader>
          <SidebarContent>
            {sidebarNav.map((section) => (
              <SidebarMenuItem
                key={section.title}
                label={section.title}
                icon={section.icon}
                defaultOpen={true}
              >
                {section.pages.map((page) => (
                  <NestedLink key={page.href} href={page.href}>
                    {page.title}
                  </NestedLink>
                ))}
              </SidebarMenuItem>
            ))}
            {/* <SidebarContent>
          {topDocs.map((doc) => (
            <SidebarMenuItem
              key={doc._raw.flattenedPath}
              icon={<FileText className="h-5 w-5" />}
              label={doc.title}
              href={doc.url} // e.g., "/docs/search-button"
            />
          ))}

          {Object.entries(folderGroups).map(([folder, docs]) => (
            <SidebarMenuItem
              key={folder}
              label={folder
                .split('-') // Split on hyphens
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                .join(' ') // Join back with spaces
              }
              defaultOpen={true}
              icon={<FileText className="h-5 w-5" />}
            >
              {docs.map((doc) => (
                <NestedLink key={doc._raw.flattenedPath} href={doc.url}>
                  {doc.title}
                </NestedLink>
              ))}
            </SidebarMenuItem>
          ))} */}
            {/* <SidebarMenu>
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
            </SidebarMenu> */}
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
          <div className={`grid xl:grid xl:grid-cols-[1fr_270px]`}>
            <main className="overflow-auto p-6">
              {children}
            </main>
            {/* Quick Reference Aside (only visible on desktop) */}
            <aside className="fixed right-0 hidden xl:block w-64 p-6 top-16 border-l border-[var(--color-border)] h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="sticky top-0 pb-2">
                <h2 className="text-lg font-semibold text-[var(--color)]">Quick Reference</h2>
              </div>
              <nav className="mt-4">
                <ul className="space-y-4">
                  {quickReference.map((item, index) => (
                    <li key={index} className="group">
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                      >
                        {item.title}
                      </Link>

                      {item.pages && item.pages.length > 0 && (
                        <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-100 pl-3">
                          {item.pages.map((subItem, subIndex) => (
                            <li key={subIndex} className="text-sm">
                              <Link
                                href={subItem.href}
                                className="text-gray-600 hover:text-blue-600 transition-colors block py-1"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
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