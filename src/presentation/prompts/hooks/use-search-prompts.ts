'use client';

import { useQueryState, parseAsString } from 'nuqs';

export function useSearch() {
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''));

  return {
    q,
    setQ,
  };
}
