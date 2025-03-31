import React from 'react';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

// Removed duplicate Position type declaration

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  close: () => void;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

type PopoverProps = {
  children: ReactNode;
  className?: string;
  open?: boolean;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
};

export const Popover = ({
  children,
  className,
  open = false,
  onClose,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Controlled vs uncontrolled handling
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Handle external close function
  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Handle outside clicks
  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      console.log('handleClickOutside', event);
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event?.target as Node)
      ) {
        console.log('Click outside detected');
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick, onClose]);

  // Handle ESC key
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, closeOnEsc, onClose]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef, close }}>
      <div className={`relative inline-block ${className}`} ref={popoverRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

type PopoverTriggerProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export const PopoverTrigger = ({
  children,
  className,
  asChild = false,
}: PopoverTriggerProps) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverTrigger must be used within a Popover');
  }
  const { setIsOpen, triggerRef } = context;

  // If asChild is true, we clone the child element to add our props
  if (
    asChild &&
    React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)
  ) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        setIsOpen((prev) => !prev);
        children.props.onClick?.(e as React.MouseEvent<HTMLElement>);
      },
      'aria-haspopup': 'true',
    });
  }

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={() => setIsOpen((prev) => !prev)}
      aria-haspopup="true"
      ref={triggerRef}
    >
      {children}
    </div>
  );
};

// Removed duplicate PopoverContentProps declaration
export type Position = {
  xAlign: 'left' | 'center' | 'right';
  yAlign: 'top' | 'bottom' | 'center';
};

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  position?: PopoverPosition; // New position prop
}

export const PopoverContent = ({
  children,
  className,
  sideOffset = 5,
  position = 'top', // Default position is bottom
}: PopoverContentProps) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverContent must be used within a Popover');
  }

  const { isOpen, triggerRef } = context;
  const contentRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<Position>({
    xAlign: 'center',
    yAlign: position === 'top' ? 'top' : 'bottom',
  });
  const [contentStyles, setContentStyles] = useState({
    position: 'absolute',
    top: '0px',
    left: '0px',
    transform: 'translate(0px, 0px)',
    opacity: 0,
    visibility: 'hidden' as 'hidden' | 'visible',
    maxWidth: 'calc(100vw - 16px)',
    maxHeight: 'calc(100vh - 16px)',
    zIndex: 50,
  });

  // Register the content ref with the context
  useEffect(() => {
    if (context && contentRef.current) {
      context.contentRef = contentRef;
    }
  }, [context, contentRef.current]);

  // Convert the preferred position to initial placements
  const getInitialPlacement = (pos: PopoverPosition): Position => {
    switch (pos) {
      case 'top':
        return { xAlign: 'center', yAlign: 'top' };
      case 'bottom':
        return { xAlign: 'center', yAlign: 'bottom' };
      case 'left':
        return { xAlign: 'left', yAlign: 'center' };
      case 'right':
        return { xAlign: 'right', yAlign: 'center' };
      default:
        return { xAlign: 'center', yAlign: 'bottom' };
    }
  };

  // This function handles positioning the content relative to the trigger
  const updatePosition = () => {
    if (!isOpen || !contentRef.current || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    // Check if trigger is visible in viewport
    const isTriggerVisible =
      triggerRect.top < window.innerHeight &&
      triggerRect.bottom > 0 &&
      triggerRect.left < window.innerWidth &&
      triggerRect.right > 0;

    // Hide popover if trigger not visible
    if (!isTriggerVisible) {
      setContentStyles((prev) => ({
        ...prev,
        visibility: 'hidden',
        opacity: 0,
      }));
      return;
    }

    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available spaces
    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewportWidth - triggerRect.right;

    // Get preferred placements based on position prop
    const preferredPlacement = getInitialPlacement(position);

    // For vertical positioning (top or bottom)
    let yAlign: Position['yAlign'] = preferredPlacement.yAlign;
    let xAlign: Position['xAlign'] = preferredPlacement.xAlign;

    // Handle horizontal positions (left/right)
    if (position === 'left' || position === 'right') {
      // For left position, check if there's enough space
      if (position === 'left' && spaceLeft < contentRect.width) {
        // Not enough space on left, try right
        if (spaceRight >= contentRect.width) {
          xAlign = 'right';
        } else {
          // Not enough space on either side, use the one with more space
          xAlign = spaceLeft >= spaceRight ? 'left' : 'right';
        }
      }
      // For right position, check if there's enough space
      else if (position === 'right' && spaceRight < contentRect.width) {
        // Not enough space on right, try left
        if (spaceLeft >= contentRect.width) {
          xAlign = 'left';
        } else {
          // Not enough space on either side, use the one with more space
          xAlign = spaceRight >= spaceLeft ? 'right' : 'left';
        }
      }

      // For horizontal positions, center vertically by default
      yAlign = 'center';
    }
    // Handle vertical positions (top/bottom)
    else {
      // For bottom position, check if there's enough space
      if (position === 'bottom' && spaceBelow < contentRect.height) {
        // Not enough space below, try above
        if (spaceAbove >= contentRect.height) {
          yAlign = 'top';
        } else {
          // Not enough space on either side, use the one with more space
          yAlign = spaceBelow >= spaceAbove ? 'bottom' : 'top';
        }
      }
      // For top position, check if there's enough space
      else if (position === 'top' && spaceAbove < contentRect.height) {
        // Not enough space above, try below
        if (spaceBelow >= contentRect.height) {
          yAlign = 'bottom';
        } else {
          // Not enough space on either side, use the one with more space
          yAlign = spaceAbove >= spaceBelow ? 'top' : 'bottom';
        }
      }

      // Determine X alignment (left, center, right) for vertical positions
      const contentWidth = contentRect.width;
      const centerPos =
        triggerRect.left + triggerRect.width / 2 - contentWidth / 2;

      // Check if centered popover would go beyond screen edges
      if (centerPos < 0) {
        // Too far left, align with left side of trigger
        xAlign = 'left';
      } else if (centerPos + contentWidth > viewportWidth) {
        // Too far right, align with right side of trigger
        xAlign = 'right';
      } else {
        xAlign = 'center';
      }
    }

    // Set the final placement
    setPlacement({ xAlign, yAlign });

    // Calculate translation values
    let translateX = 0;
    let translateY = 0;

    // Calculate position based on placement
    if (yAlign === 'top') {
      translateY = -(contentRect.height + sideOffset);
    } else if (yAlign === 'bottom') {
      translateY = triggerRect.height + sideOffset;
    } else if (yAlign === 'center') {
      translateY = (triggerRect.height - contentRect.height) / 2;
    }

    if (xAlign === 'left') {
      if (position === 'left') {
        translateX = -(contentRect.width + sideOffset);
      } else {
        translateX = 0;
      }
    } else if (xAlign === 'right') {
      if (position === 'right') {
        translateX = triggerRect.width + sideOffset;
      } else {
        translateX = triggerRect.width - contentRect.width;
      }
    } else if (xAlign === 'center') {
      translateX = (triggerRect.width - contentRect.width) / 2;
    }

    // Calculate final position (relative to trigger)
    const top = 0; // We'll use transform instead
    const left = 0; // We'll use transform instead

    // Apply positioning with transform
    setContentStyles({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      transform: `translate(${translateX}px, ${translateY}px)`,
      opacity: 1,
      visibility: 'visible',
      maxWidth: 'calc(100vw - 16px)',
      maxHeight: 'calc(100vh - 16px)',
      zIndex: 10,
    });
  };

  useEffect(() => {
    // Position content initially and on changes
    updatePosition();

    // Update position on scroll and resize
    const handlePositionChange = () => {
      window.requestAnimationFrame(updatePosition);
    };

    window.addEventListener('resize', handlePositionChange);
    window.addEventListener('scroll', handlePositionChange, true); // Capture phase to catch all scrolls

    return () => {
      window.removeEventListener('resize', handlePositionChange);
      window.removeEventListener('scroll', handlePositionChange, true);
    };
  }, [isOpen, sideOffset, position]);

  // Update position when content changes
  useEffect(() => {
    const observer = new MutationObserver(updatePosition);
    if (contentRef.current) {
      observer.observe(contentRef.current, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={contentRef}
      className={`border rounded-lg shadow-md bg-background border-border transition-opacity duration-200 ${className}`}
      style={
        {
          ...contentStyles,
          transition: 'opacity 200ms, visibility 200ms',
        } as React.CSSProperties
      }
      role="dialog"
      data-placement={`${placement.yAlign}-${placement.xAlign}`}
    >
      {children}
    </div>
  );
};

// Additional components for convenience

type PopoverCloseProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export const PopoverClose = ({
  children,
  className,
  asChild = false,
}: PopoverCloseProps) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverClose must be used within a Popover');
  }
  const { close } = context;

  // If asChild is true, we clone the child element to add our props
  if (
    asChild &&
    React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)
  ) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        close();
        children.props.onClick?.(e as React.MouseEvent<HTMLElement>);
      },
    });
  }

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={close}
      aria-label="Close"
    >
      {children}
    </div>
  );
};
