// src/app/doc/layout.tsx
import React from "react";
import { allDocs } from "contentlayer/generated";
import SearchDialog from "@/components/search-dialog";

import {
  SidebarProvider,
  DocLayout,
  DocContent,
  DocHeader,
  DocMain,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarButton,
  Logo,
  Title,
  NestedLink,
  TOCHeading,
  TOCLink,
  TOCGroup
} from "@/components/sidebar/claude-sidebar"

import { Home, FileText, BookOpen, Code, ExternalLink, Search, Moon, Github } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocLayout>
      {/* Left Navigation Sidebar */}
      <SidebarProvider defaultOpen={true} defaultSide="left" defaultMaxWidth={280} showIconsOnCollapse={true} isAlwaysVisible={false}>
        <Sidebar>
          <SidebarHeader>
            <Logo />
            <Title>Documentation</Title>
            <SidebarTrigger />
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem icon={<Home className="h-5 w-5" />} label="Overview" href="/docs" />
              <SidebarMenuItem icon={<BookOpen className="h-5 w-5" />} label="Getting Started" defaultOpen={true}>
                <NestedLink href="/docs/installation">Installation</NestedLink>
                <NestedLink href="/docs/quick-start">Quick Start</NestedLink>
                <NestedLink href="/docs/configuration">Configuration</NestedLink>
              </SidebarMenuItem>
              <SidebarMenuItem icon={<Code className="h-5 w-5" />} label="Components" defaultOpen={true}>
                <NestedLink href="/docs/components/sidebar">Sidebar</NestedLink>
                <NestedLink href="/docs/components/navigation">Navigation</NestedLink>
                <NestedLink href="/docs/components/layout">Layout</NestedLink>
              </SidebarMenuItem>
              <SidebarMenuItem icon={<FileText className="h-5 w-5" />} label="API Reference" href="/docs/api" />
              <SidebarMenuItem icon={<ExternalLink className="h-5 w-5" />} label="Resources" defaultOpen={true}>
                <NestedLink href="/docs/resources/examples">Examples</NestedLink>
                <NestedLink href="/docs/resources/showcase">Showcase</NestedLink>
                <NestedLink href="https://github.com/yourusername/your-project">GitHub</NestedLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="text-sm text-gray-500">v1.0.0</div>
            <a href="https://github.com/yourusername/your-project" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              <Github className="h-5 w-5" />
            </a>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>

      {/* Main Content Area */}
      <DocContent>
        <DocHeader>
          <div className="flex items-center gap-4">
            <SidebarButton sidebarId="left" />
            <Title>Documentation</Title>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search className="h-5 w-5" />
            </button>
            <ModeToggle />
            <a 
              href="https://github.com/yourusername/your-project" 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </DocHeader>
        
        <DocMain className="p-4 md:p-8 pb-16">
          {children}
        </DocMain>
      </DocContent>

      {/* Right TOC Sidebar - Always visible */}
      <SidebarProvider defaultSide="right" defaultMaxWidth={240} isAlwaysVisible={true}>
        <Sidebar className="hidden lg:flex"> {/* Hide on mobile and smaller screens */}
          <SidebarHeader>
            <TOCHeading>On This Page</TOCHeading>
          </SidebarHeader>

          <SidebarContent>
            <TOCGroup>
              <TOCLink href="#introduction" active>Introduction</TOCLink>
              <TOCLink href="#installation">Installation</TOCLink>
              <TOCLink href="#usage">Usage</TOCLink>
              <TOCLink href="#api" depth={1}>API Reference</TOCLink>
              <TOCLink href="#props" depth={2}>Props</TOCLink>
              <TOCLink href="#methods" depth={2}>Methods</TOCLink>
              <TOCLink href="#examples">Examples</TOCLink>
              <TOCLink href="#troubleshooting">Troubleshooting</TOCLink>
            </TOCGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex flex-col text-xs text-gray-500">
              <span>Last updated: March 1, 2025</span>
              <a href="#" className="text-blue-500 hover:underline">Edit this page</a>
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </DocLayout>
  );
}