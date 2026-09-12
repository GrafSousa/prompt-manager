'use client';

import { twMerge } from 'tailwind-merge';
import React, { createContext, useContext, useState } from 'react';
import { MissingContextError } from '@/core/errors/missing-context-error';

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
          'absolute z-10 inset-x-4 top-4 bg-gray-700 p-4 rounded-2xl',
          'md:static md:flex md:h-screen md:flex-col md:overflow-hidden',
          'transition-[width,height] duration-200 ease-linear',
          `${isCollapsed ? 'h-100 md:w-100' : 'h-15 md:w-18 md:px-2 md:py-8 md:items-center'}`,
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
