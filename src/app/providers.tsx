'use client';

import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { makeQueryClient } from '@/presentation/lib/react-query/query-client';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = React.useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
}
