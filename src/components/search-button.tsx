"use client";

import * as React from "react";
import clsx from "clsx";
import { Command } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export interface SearchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeMapping = {
  xs: {
    button: "py-1 px-2 text-xs",
    icon: "px-1",
    iconSize: 11,
  },
  sm: {
    button: "py-1.5 px-3 text-sm",
    icon: "px-1",
    iconSize: 12,
  },
  md: {
    button: "py-2 px-4 text-base",
    icon: "px-1",
    iconSize: 13,
  },
  lg: {
    button: "py-3 px-6 text-lg",
    icon: "px-2",
    iconSize: 14,
  },
  xl: {
    button: "py-4 px-8 text-xl",
    icon: "px-2",
    iconSize: 15,
  },
};

const SearchButton = React.forwardRef<HTMLButtonElement, SearchButtonProps>(
  (
    { placeholder = "Search Documentation..", size = "md", className, ...props },
    ref
  ) => {
    const { icon, iconSize } = sizeMapping[size];
    return (
      <Button
        ref={ref}
        variant={'secondary'}
        className={cn("flex gap-2", className)}
        {...props}
      >
        <span>{placeholder}</span>
        <span
          className={clsx(
            "inline-flex items-center justify-center rounded border border-border gap-1",
            "bg-secondary",
            icon
          )}
        >
          <Command size={iconSize} />
          <span>k</span>
        </span>
      </Button>
    );
  }
);

SearchButton.displayName = "SearchButton";

export default SearchButton;
