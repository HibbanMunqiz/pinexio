import { pages } from "next/dist/build/templates/app-page";
import { Herr_Von_Muellerhoff } from "next/font/google";
import { hrtime, title } from "process";
import { Component, Paintbrush, Rocket, Search } from "lucide-react"

export const configDocs = {
    quickReference: {
        'Introduction': [
            {
                title: "Welcome to Pinedocs",
                href: "/docs/getting-started/introduction#welcome-to-pinedocs",
                pages: [
                    {
                        title: "Why Choose Pinedocs",
                        href: "/docs/getting-started/introduction#why-choose-pinedocs",
                    },

                    {
                        title: "What Makes Pinedocs Special",
                        href: "/docs/getting-started/introduction#what-makes-pinedocs-special",
                    },
                ],
            },
        ],
        'Installation': [
            {
                title: "Steps to install",
                href: "/docs/getting-started/installation",
            },
        ]

    },
    sidebarNav: [
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
                    title: "SearchButton",
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
}
