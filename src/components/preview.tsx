'use client';
import React, { ReactNode } from 'react';

interface PreviewProps {
  children: ReactNode;
  className?: string;
}

export function Preview({ children, className }: PreviewProps) {
  return (
    <div
      className={`p-4 h-[330px] justify-items-center content-center rounded-lg border border-border bg-muted text-card-foreground ${className}`}
    >
      {children}
    </div>
  );
}

export default Preview;
