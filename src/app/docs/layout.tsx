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
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeaderLogo,
  Title,
  UserAvatar,
  NestedLink,
} from "@/components/sidebar"
import { Github } from "lucide-react"
import { useRouter } from 'next/navigation'

import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/button";
import { useIsMobile } from "@/hooks/use-mobile";
// Group docs into top-level and nested by folder
// function groupDocs(docs: any[]) {
//   const topDocs: any[] = [];
//   const folderGroups: { [key: string]: any[] } = {};

//   docs.forEach((doc) => {
//     // If the file is in the root, push to topDocs
//     if (doc._raw.sourceFileDir === ".") {
//       topDocs.push(doc);
//     } else {
//       // Use the folder name from sourceFileDir (e.g. "getting-started")
//       const folder = doc._raw.sourceFileDir;
//       if (!folderGroups[folder]) {
//         folderGroups[folder] = [];
//       }
//       folderGroups[folder].push(doc);
//     }
//   });

//   return { topDocs, folderGroups };
// }

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { topDocs, folderGroups } = groupDocs(allDocs);
  // Destructure sidebarNav from configDocs
  const router = useRouter()
  const isMobile = useIsMobile()
  const { sidebarNav } = configDocs;
  return (
    <SidebarLayout>
      {/* Left Sidebar Provider */}
      <SidebarProvider defaultOpen={isMobile ? false: true} defaultSide="left" defaultMaxWidth={280} showIconsOnCollapse={true}>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLogo logo={<Image alt="logo" className={'h-auto w-aut dark:invert'} width={100} height={100}
              src={`/logos/pinedocs.png`} />} />

            <Link href={"/"} className="flex flex-1 gap-3" ><Title>PINE<span className="text-3xl">D</span>OCS</Title>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {sidebarNav.map((section) => (
              <SidebarMenuItem
                isCollapsable={section.pages && section.pages.length > 0}
                key={section.title}
                label={section.title}
                href={section.href}
                icon={section.icon}
                defaultOpen={true}
              >
                {section.pages?.map((page) => (
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
            <UserAvatar 
            avatar={<Image alt="logo" src={"https://avatars.githubusercontent.com/u/24631970?v=4"} width={100} height={100}/>}/>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Sanjay Rajeev</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">sanjayc208@gmail.com</span>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          <Header className="justify-between py-2">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">
                Documentation
              </h1>
            </div>
            <div className="flex gap-2 items-center pr-0 lg:pr-8">
              <SearchDialog searchData={allDocs} />
              <ModeToggle />
              <Button onClick={() => router.push('https://github.com/sanjayc208/pinedocs')}>
              <Github className="h-[1.2rem] w-[1.2rem] transition-all"/></Button>
            </div>
          </Header>
          {/* <div className={`grid xl:grid xl:grid-cols-[1fr_270px]`}> */}
            <main className="overflow-auto p-6">
              {children}
            </main>
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