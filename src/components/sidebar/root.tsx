'use client';

import { MissingContextError } from '@/core/errors/missing-context-error';
import React, { createContext, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface SidebarRootValues {
  isCollapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarRootValues>({
  isCollapsed: true,
  toggle: () => {},
});

export function SidebarRoot({
  children,
  className,
  ...props
}: React.ComponentProps<'aside'>) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggle: () => setIsCollapsed((c) => !c),
      }}
    >
      <aside
        data-slot="sidebar"
        data-collapsed={isCollapsed}
        className={twMerge(
          'flex flex-col h-full bg-gray-700 overflow-y-auto',
          `${isCollapsed ? 'w-100 p-8' : 'w-18 px-2 py-8 items-center'}`,
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw new MissingContextError('useSidebar', 'SidebarContext');
  }

  const { isCollapsed, toggle } = ctx;

  return {
    toggle,
    isCollapsed,
  };
}
