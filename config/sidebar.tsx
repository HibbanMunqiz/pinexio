import { Component, Paintbrush, Rocket, Search } from "lucide-react"

export const sidebarNav = [
    {
        title: "Getting Started",
        icon: <Rocket className="h-5 w-5" />,
        pages: [
            {
                title: "Introduction",
                href: "/docs/getting-started/introduction",
            },
            {
                title: "Installation",
                href: "/docs/getting-started/installation",
            }
        ],
    },
    {
        title: "Components",
        icon: <Component className="h-5 w-5" />,
        pages: [
            {
                title: "Button",
                href: "/docs/components/button",
            },
            {
                title: "Search Button",
                href: "/docs/components/search-button",
            },
            {
                title: "Tabs",
                href: "/docs/components/tabs",
            },
            {
                title: "Sidebar",
                href: "/docs/components/sidebar",
            },
            {
                title: "Steps",
                href: "/docs/components/steps",
            },
            {
                title: "Syntax Highlighter",
                href: "/docs/components/syntax-highlighter",
            },
            {
                title: "Folder Tree",
                href: "/docs/components/folder-tree",
            },
            {
                title: "Note",
                href: "/docs/components/note",
            },
        ],
    },
    {
        title: "Theme",
        icon: <Paintbrush className="h-5 w-5" />,
        href: "/docs/theme",
        pages: []
    },
    {
        title: "Search Bar",
        icon: <Search className="h-5 w-5" />,
        href: "/docs/search-bar",
        pages: []
    }
]
