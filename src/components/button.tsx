"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const buttonVariants = cva(
  "inline-flex cursor-pointer flex items-center rounded-lg border font-medium transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 focus:ring-[var(--color-primary)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary)]/90 focus:ring-[var(--color-secondary)]",
        outline:
          "border border-[var(--color-border)] hover:bg-[var(--color-muted)]/20 focus:ring-[var(--color-ring)]",
        none:
          "bg-transparent border-0",
      },
      size: {
        xs: "py-1 px-2 text-xs",
        sm: "py-1.5 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
        xl: "py-4 px-8 text-xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * A fully customizable Button component.
 *
 * This component uses Tailwind CSS classes with your global CSS variables,
 * so it will automatically adjust for dark and light mode. It also supports
 * size variants (xs, sm, md, lg, xl) and variant styles (primary, secondary, outline).
 *
 * @example
 * <Button variant="secondary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
