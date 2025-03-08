import React from "react";
import clsx from "clsx";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  headerTitle?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  headerTitle: title,
  description,
  actions,
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={clsx("sticky top-0 z-1 flex items-center justify-between xs:min-h-auto md:min-h-16 border-b px-3 bg-defaultBase/60 backdrop-blur", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export default Header;
