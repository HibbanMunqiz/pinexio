// src/components/Sidebar.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";

// -----------------------------------------------------------------------------
// Sidebar Context & Provider
// -----------------------------------------------------------------------------
interface SidebarContextValue {
  open: boolean;
  toggleSidebar: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen((prev) => !prev);
  return (
    <SidebarContext.Provider value={{ open, toggleSidebar, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// SidebarWrapper Component (Compound)
// -----------------------------------------------------------------------------
export interface SidebarWrapperProps {
  children: React.ReactNode; // Main content
  sidebar: React.ReactNode; // Sidebar content
  /** Sidebar position: "left" or "right". Default is "left". */
  position?: "left" | "right";
  /** Sidebar width when open on desktop. Default is "250px". */
  sidebarWidth?: string;
  /** Optional custom class for the outer wrapper. */
  wrapperClassName?: string;
  /** Optional custom class for the sidebar container. */
  sidebarClassName?: string;
  /** Optional custom class for the main content container. */
  contentClassName?: string;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> & {
  Header: React.FC<{ children: ReactNode; className?: string }>;
  Main: React.FC<{ children: ReactNode; className?: string }>;
} = ({
  children,
  sidebar,
  position = "left",
  sidebarWidth = "250px",
  wrapperClassName = "",
  sidebarClassName = "",
  contentClassName = "",
}) => {
  const { open, setOpen } = useSidebar();

  // Determine if we're on mobile (simple check)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const effectiveWidth = isMobile ? "70vw" : open ? sidebarWidth : "0px";

  return (
    <div className={`flex relative ${wrapperClassName}`}>
      <div className="flex">
        {position === "left" && (
          <div
            className={`hidden md:block transition-all duration-300 overflow-hidden border-x border-gray-200 ${sidebarClassName}`}
            style={{ width: open ? sidebarWidth : "0px" }}
          >
            {sidebar}
          </div>
        )}
        <div
          className={`flex-1 transition-all duration-300 ${contentClassName}`}
          style={{
            marginLeft:
              position === "left" && open && !isMobile ? sidebarWidth : undefined,
            marginRight:
              position === "right" && open && !isMobile ? sidebarWidth : undefined,
          }}
        >
          {children}
        </div>
        {position === "right" && (
          <div
            className={`hidden md:block transition-all duration-300 overflow-hidden border-x border-gray-200 ${sidebarClassName}`}
            style={{ width: open ? sidebarWidth : "0px" }}
          >
            {sidebar}
          </div>
        )}
      </div>

      {/* Mobile Sidebar using Radix UI Dialog */}
      <Dialog.Root
        open={open}
        onOpenChange={(value) => setOpen(value)}
        modal={true}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 md:hidden" />
          <Dialog.Content
            onPointerDownOutside={(event) => event.preventDefault()}
            className="fixed inset-y-0 p-4 bg-white md:hidden transition-transform duration-300 border-x border-gray-200"
            style={{
              width: "70vw",
              [position]: 0,
              transform:
                open
                  ? "translateX(0)"
                  : position === "left"
                  ? "translateX(-100%)"
                  : "translateX(100%)",
            }}
          >
            <Dialog.Title className="sr-only">Sidebar Navigation</Dialog.Title>
            <Dialog.Close asChild>
              <button className="mb-4 px-3 py-2 bg-red-500 text-white rounded">
                Close
              </button>
            </Dialog.Close>
            {sidebar}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

// Compound subcomponents for Sidebar content.
const SidebarHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const SidebarMain: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={`p-4 ${className}`}>{children}</div>;

// Attach compound subcomponents to SidebarWrapper.
SidebarWrapper.Header = SidebarHeader;
SidebarWrapper.Main = SidebarMain;

// -----------------------------------------------------------------------------
// Exportable Toggle Button
// -----------------------------------------------------------------------------
export const SidebarToggleButton: React.FC<{
  className?: string;
  children?: ReactNode;
}> = ({ className = "", children }) => {
  const { open, toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className={`px-4 py-2 bg-blue-600 text-white rounded ${className}`}
    >
      {children ? children : open ? "Close Sidebar" : "Open Sidebar"}
    </button>
  );
};

export default SidebarWrapper;
