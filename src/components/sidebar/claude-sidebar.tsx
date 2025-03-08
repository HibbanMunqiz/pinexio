"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

type SidebarContextType = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  side: "left" | "right"
  isMobile: boolean
  maxWidth: number
  toggleSidebar: () => void
  showIconsOnCollapse: boolean
  isAlwaysVisible: boolean
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  defaultSide?: "left" | "right"
  defaultMaxWidth?: number
  showIconsOnCollapse?: boolean
  isAlwaysVisible?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  defaultSide = "left",
  defaultMaxWidth = 280,
  showIconsOnCollapse = true,
  isAlwaysVisible = false,
}: SidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || isAlwaysVisible)
  const isMobile = useIsMobile()
  const [side] = React.useState<"left" | "right">(defaultSide)
  const [maxWidth] = React.useState(defaultMaxWidth)

  // Ensure sidebar stays open if it's always visible
  React.useEffect(() => {
    if (isAlwaysVisible) {
      setIsOpen(true)
    }
  }, [isAlwaysVisible])

  const toggleSidebar = React.useCallback(() => {
    if (!isAlwaysVisible) {
      setIsOpen((prev) => !prev)
    }
  }, [isAlwaysVisible])

  // Add keyboard shortcut (Ctrl+B) to toggle sidebar
  React.useEffect(() => {
    if (isAlwaysVisible) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, isAlwaysVisible])

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      side,
      isMobile,
      maxWidth,
      toggleSidebar,
      showIconsOnCollapse,
      isAlwaysVisible,
    }),
    [isOpen, setIsOpen, side, isMobile, maxWidth, toggleSidebar, showIconsOnCollapse, isAlwaysVisible]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

// For enabling multiple sidebars in a layout
export function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-row">
      {children}
    </div>
  )
}

// Component for main content between sidebars
export function DocContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex-1 flex flex-col min-h-screen w-full ${className}`}>
      {children}
    </div>
  )
}

// Header component for the docs layout
export function DocHeader({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <header className={`sticky top-0 z-30 w-full border-b bg-background h-16 flex items-center px-4 ${className}`}>
      {children}
    </header>
  )
}

// Main scrollable area
export function DocMain({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <main className={`flex-1 overflow-auto ${className}`}>
      {children}
    </main>
  )
}

export function Sidebar({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const { isOpen, side, isMobile, maxWidth, setIsOpen, showIconsOnCollapse, isAlwaysVisible } = useSidebar()

  // For mobile: use a fixed overlay when sidebar is open
  if (isMobile) {
    return (
      <>
        {isOpen && !isAlwaysVisible && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <aside
          className={`
            fixed top-0 bottom-0 z-50 flex flex-col
            ${side === "left" ? "left-0" : "right-0"}
            ${isOpen ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full"}
            w-[85vw] max-w-[300px] bg-white dark:bg-gray-900 
            ${side === "left" ? "border-r" : "border-l"} dark:border-gray-800
            transition-transform duration-200 ease-in-out
            ${className}
          `}
          style={{ maxWidth: `${maxWidth}px` }}
        >
          {children}
        </aside>
      </>
    )
  }

  // For desktop: use a regular sidebar with correct width based on showIconsOnCollapse
  return (
    <aside
      className={`
        relative flex flex-col shrink-0 h-screen sticky top-0
        ${side === "left" ? "border-r" : "border-l"} dark:border-gray-800
        transition-all duration-200 ease-in-out
        bg-white dark:bg-gray-900
        ${className}
      `}
      style={{ 
        width: isOpen 
          ? `${maxWidth}px` 
          : (showIconsOnCollapse && !isAlwaysVisible) ? "4rem" : "0",
        minWidth: isAlwaysVisible ? `${maxWidth}px` : (isOpen ? `${maxWidth}px` : (showIconsOnCollapse ? "4rem" : "0")), 
      }}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const { isOpen, showIconsOnCollapse, isAlwaysVisible } = useSidebar()

  // Extract the first child to show as icon when collapsed
  const childrenArray = React.Children.toArray(children)
  const firstChild = childrenArray[0]

  return (
    <div
      className={`
        flex items-center h-16 px-4 border-b dark:border-gray-800 sticky top-0 z-20
        bg-white dark:bg-gray-900
        ${isOpen ? "justify-between" : "justify-center"}
        ${className}
      `}
    >
      {isOpen || isAlwaysVisible ? children : (showIconsOnCollapse && firstChild ? firstChild : null)}
    </div>
  )
}

export function SidebarContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const { isOpen, showIconsOnCollapse, isAlwaysVisible } = useSidebar()
  return (isOpen || showIconsOnCollapse || isAlwaysVisible) ? (
    <div className={`flex-1 overflow-auto py-2 ${className}`}>{children}</div>
  ) : null
}

export function SidebarFooter({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const { isOpen, showIconsOnCollapse, isAlwaysVisible } = useSidebar()

  // Extract the first child to show as icon when collapsed
  const childrenArray = React.Children.toArray(children)
  const firstChild = childrenArray[0]

  return (
    <div
      className={`
        flex items-center h-16 px-4 border-t dark:border-gray-800
        sticky bottom-0 bg-white dark:bg-gray-900 z-20
        ${isOpen ? "justify-between" : "justify-center"}
        ${className}
      `}
    >
      {isOpen || isAlwaysVisible ? children : (showIconsOnCollapse && firstChild ? firstChild : null)}
    </div>
  )
}

export function SidebarMenu({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const { isOpen, showIconsOnCollapse, isAlwaysVisible } = useSidebar()
  return (isOpen || showIconsOnCollapse || isAlwaysVisible) ? (
    <nav className={`space-y-1 px-2 ${className}`}>{children}</nav>
  ) : null
}

interface SidebarMenuItemProps {
  icon?: React.ReactNode
  label: string
  href?: string
  children?: React.ReactNode
  isActive?: boolean
  defaultOpen?: boolean
  alwaysOpen?: boolean
  className?: string
}

export function SidebarMenuItem({
  icon,
  label,
  href,
  children,
  isActive: propIsActive,
  defaultOpen = false,
  alwaysOpen = false,
  className = "",
}: SidebarMenuItemProps) {
  const { isOpen, showIconsOnCollapse, isAlwaysVisible } = useSidebar()
  const [isExpanded, setIsExpanded] = React.useState(defaultOpen || alwaysOpen)
  const pathname = usePathname()

  // Determine if this item is active based on the current path
  const isActive =
    propIsActive !== undefined ? propIsActive : href ? pathname === href || pathname.startsWith(href) : false

  React.useEffect(() => {
    // If alwaysOpen is true, ensure the menu stays open
    if (alwaysOpen) {
      setIsExpanded(true)
    }
  }, [alwaysOpen])

  const handleClick = (e: React.MouseEvent) => {
    if (children && !href && !alwaysOpen) {
      e.preventDefault()
      setIsExpanded((prev) => !prev)
    }
  }

  const content = (
    <>
      <div className="flex items-center">
        {icon && (
          <span
            className={`${isActive ? "text-blue-500" : "text-gray-500 dark:text-gray-400"} ${isOpen ? "mr-3" : ""}`}
          >
            {icon}
          </span>
        )}
        {(isOpen || isAlwaysVisible) && (
          <span className={`${isActive ? "font-medium text-blue-500" : "text-gray-700 dark:text-gray-300"}`}>
            {label}
          </span>
        )}
      </div>
      {(isOpen || isAlwaysVisible) && children && !alwaysOpen && (
        <span className="ml-auto">
          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        </span>
      )}
    </>
  )

  return (
    <div className={className}>
      {href ? (
        <Link
          href={href}
          className={`
            flex items-center justify-between w-full p-2 rounded-md
            ${
              isActive
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }
            ${!(isOpen || isAlwaysVisible) ? "justify-center" : ""}
          `}
          onClick={handleClick}
        >
          {content}
        </Link>
      ) : (
        <button
          className={`
            flex items-center justify-between w-full p-2 rounded-md
            ${
              isActive
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }
            ${!(isOpen || isAlwaysVisible) ? "justify-center" : ""}
          `}
          onClick={handleClick}
        >
          {content}
        </button>
      )}

      {(isOpen || isAlwaysVisible) && (isExpanded || alwaysOpen) && children && (
        <div className="ml-6 mt-1 pl-3 border-l border-gray-200 dark:border-gray-700 space-y-1">{children}</div>
      )}
    </div>
  )
}

export function NestedLink({
  children,
  href = "#",
  isActive: propIsActive,
  className = "",
}: {
  children: React.ReactNode
  href?: string
  isActive?: boolean
  className?: string
}) {
  const pathname = usePathname()

  // Determine if this link is active based on the current path
  const isActive = propIsActive !== undefined ? propIsActive : pathname === href || pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`
        block py-1 px-2 rounded-md text-sm
        ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500 font-medium"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
        ${className}
      `}
    >
      {children}
    </Link>
  )
}

export function SidebarTrigger({ className = "" }: { className?: string }) {
  const { toggleSidebar, side, isOpen, isAlwaysVisible } = useSidebar()

  // Don't render the trigger if sidebar is always visible
  if (isAlwaysVisible) return null;

  return (
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label="Toggle sidebar"
    >
      {isOpen ? (
        side === "left" ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </button>
  )
}

// Export a standalone button that can be placed anywhere to control a specific sidebar
export function SidebarButton({ sidebarId = "left", className = "" }: { sidebarId?: "left" | "right", className?: string }) {
  // This is a standalone component that can be used outside of a SidebarProvider
  // It uses a custom event to communicate with the sidebar
  const toggleSidebar = React.useCallback(() => {
    const event = new CustomEvent("toggle-sidebar", { detail: { sidebarId } });
    window.dispatchEvent(event);
  }, [sidebarId]);

  return (
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label={`Toggle ${sidebarId} sidebar`}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

// Add event listener for the SidebarButton
React.useEffect(() => {
  const handleToggleSidebar = (event: Event) => {
    const customEvent = event as CustomEvent;
    const sidebarId = customEvent.detail?.sidebarId;
    // You would need to implement this part to locate and toggle the correct sidebar
    // This is a placeholder
  };
  
  window.addEventListener("toggle-sidebar", handleToggleSidebar);
  return () => {
    window.removeEventListener("toggle-sidebar", handleToggleSidebar);
  };
}, []);

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold">S</div>
    </div>
  )
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{children}</h1>
}

export function UserAvatar() {
  return (
    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">U</span>
    </div>
  )
}

export function UserInfo() {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-white">User Name</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">user@example.com</span>
    </div>
  )
}

// TOC (Table of Contents) specific components for the right sidebar
export function TOCHeading({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <h4 className={`text-sm font-semibold text-gray-900 dark:text-white mb-2 ${className}`}>
      {children}
    </h4>
  )
}

export function TOCLink({ children, href = "#", active = false, depth = 0, className = "" }: { 
  children: React.ReactNode, 
  href?: string, 
  active?: boolean,
  depth?: number,
  className?: string 
}) {
  const indentClass = depth === 0 ? "" : `pl-${depth * 2}`;
  
  return (
    <Link
      href={href}
      className={`
        block py-1 text-sm transition-colors
        ${active 
          ? "text-blue-500 font-medium" 
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
        }
        ${indentClass}
        ${className}
      `}
    >
      {children}
    </Link>
  )
}

export function TOCGroup({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {children}
    </div>
  )
}