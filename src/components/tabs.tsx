"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Size = "xs" | "sm" | "md" | "lg" | "xl"

const sizeClasses: Record<Size, string> = {
  xs: "py-1 px-2 text-xs",
  sm: "py-1.5 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
  xl: "py-4 px-8 text-xl",
}

interface TabsContextType {
  value: string
  onChange: (value: string) => void
  registerTab: (value: string, ref: React.RefObject<HTMLButtonElement>) => void
  size: Size
  indicatorRef: React.RefObject<HTMLDivElement>
}

const TabsContext = React.createContext<TabsContextType>({
  value: "",
  onChange: () => {},
  registerTab: () => {},
  size: "sm",
  indicatorRef: React.createRef<HTMLDivElement>(),
})

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  onTabClick?: (value: string) => void
  size?: Size
}


const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, defaultValue, value, onValueChange, onTabClick, size = "md", ...props },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")
    const [tabRefs, setTabRefs] = React.useState<Record<string, React.RefObject<HTMLButtonElement>>>({})
    const indicatorRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])
    

    React.useEffect(() => {
        const selectedTabRef = tabRefs[selectedValue];
        if (!selectedTabRef?.current || !indicatorRef.current) return;
      
        const updateIndicator = () => {
          const tabElement = selectedTabRef.current;
          const tabElBounding = tabElement?.getBoundingClientRect();
          if(indicatorRef.current){
          indicatorRef.current!.style.width = `${tabElBounding?.width}px`;
          indicatorRef.current!.style.transform = `translateX(${tabElement.offsetLeft}px)`;
          }
        };
      
        updateIndicator();
      
        // Create a ResizeObserver that will update the indicator when the tab size changes.
        const observer = new ResizeObserver(() => {
          updateIndicator();
        });
        observer.observe(selectedTabRef.current);
      
        // Clean up the observer when the effect is re-run or the component unmounts.
        return () => {
          observer.disconnect();
        };
      }, [selectedValue, tabRefs]);
      

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setSelectedValue(newValue)
        onValueChange?.(newValue)
        onTabClick?.(newValue)
      },
      [onValueChange, onTabClick],
    )

    const registerTab = React.useCallback((value: string, ref: React.RefObject<HTMLButtonElement>) => {
      setTabRefs((prev) => ({ ...prev, [value]: ref }))
    }, [])

    return (
      <TabsContext.Provider
        value={{
          value: selectedValue,
          onChange: handleValueChange,
          registerTab,
          size,
          indicatorRef,
        }}
      >
        <div ref={ref} className={cn("w-full", className)} {...props} />
      </TabsContext.Provider>
    )
  },
)
Tabs.displayName = "Tabs"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => {
  const { indicatorRef } = React.useContext(TabsContext)

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn("relative inline-flex w-full items-center justify-center rounded-lg p-1", className)}
        {...props}
      />
      <div
        ref={indicatorRef}
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
        aria-hidden="true"
      />
    </div>
  )
})
TabsList.displayName = "TabsList"

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(({ className, value, ...props }, forwardedRef) => {
  const { value: selectedValue, onChange, registerTab, size } = React.useContext(TabsContext)
  const isSelected = selectedValue === value
  const tabRef = React.useRef<HTMLButtonElement>(null)

  // Register the tab (we ignore the return value from useEffect)
  React.useEffect(() => {
    registerTab(value, tabRef)
  }, [value, registerTab])

  return (
    <button
      ref={(node) => {
        tabRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      }}
      role="tab"
      type="button"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      data-value={value}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        isSelected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
      onClick={() => onChange(value)}
      {...props}
    />
  )
})
Tab.displayName = "Tab"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  const { value: selectedValue } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      data-value={value}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, Tab, TabsContent }
