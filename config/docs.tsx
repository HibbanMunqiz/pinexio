import { pages } from "next/dist/build/templates/app-page";
import { Herr_Von_Muellerhoff } from "next/font/google";
import { hrtime, title } from "process";
import {Component, Rocket} from "lucide-react"

export const configDocs = {
    quickReference: [
        {
            title: "Installation",
            href: "docs/components/input#installation",
            pages: [
                {
                    title: "Props",
                    href: "/docs/getting-started/introduction",
                },
            ],
    }
],
    sidebarNav: [
        {
            title: "Getting Started",
            icon:<Rocket className="h-5 w-5"/>,
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
            icon:<Component className="h-5 w-5"/>,
            pages: [
                {
                    title: "Button",
                    href: "/docs/components/button",
                },
                {
                    title: "Input",
                    href: "/docs/components/input",
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
        }
    ]
}
