'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPromptsQuery } from '../queries/fetch-prompts-query';
import { FetchManyPromptsDto } from '@/infra/dtos/fetch-many-prompts-dto';
import { useSearch } from './use-search-prompts';

interface UseFetchPromptsParams {
  initialPageData: FetchManyPromptsDto;
}

export function useFetchPrompts({ initialPageData }: UseFetchPromptsParams) {
  const { q } = useSearch();

  const normalizedSearch = q.trim();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['prompts', 'search', normalizedSearch],
    initialPageParam: undefined as string | undefined,
    initialData:
      !normalizedSearch && initialPageData
        ? {
            pages: [initialPageData],
            pageParams: [undefined],
          }
        : undefined,
    queryFn: ({ pageParam }) => fetchPromptsQuery({ cursor: pageParam, q }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });

  return {
    error,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isPending,
    isLoadingMore: isFetchingNextPage,
    prompts: data?.pages.flatMap((page) => page?.prompts ?? []) ?? [],
  };
}
