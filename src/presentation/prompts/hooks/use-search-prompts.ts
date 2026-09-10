'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useQueryState, parseAsString } from 'nuqs';

import { fetchPromptsQuery } from '../queries/fetch-prompts-query';

export function useSearchPrompts() {
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''));

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['prompts', 'search', q],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => fetchPromptsQuery({ cursor: pageParam, q }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  return {
    q,
    error,
    setQ,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetching,
    isLoadingMore: isFetchingNextPage,
    prompts: data?.pages.flatMap((page) => page.prompts) ?? [],
  };
}
