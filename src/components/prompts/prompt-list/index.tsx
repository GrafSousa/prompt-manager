'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

import { useFetchPrompts } from '@/presentation/prompts/hooks/use-fetch-prompts';

import { PromptCard } from '../card';
import { Skeleton } from '@/components/ui/skeleton';
import { FetchManyPromptsDto } from '@/infra/dtos/fetch-many-prompts-dto';

interface PromptListProps {
  initialPageData: FetchManyPromptsDto;
}

export function PromptList({ initialPageData }: PromptListProps) {
  const { prompts, hasMore, isLoadingMore, isLoading, loadMore } =
    useFetchPrompts({ initialPageData });

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sentinelRef.current;

    if (!element || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoadingMore]);

  if (isLoading && !isLoadingMore) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
      <Skeleton key={item} className="h-9" />
    ));
  }

  return (
    <>
      <motion.ul
        layout
        className="space-y-5 h-50 overflow-y-auto md:min-h-0 md:flex-1"
      >
        {prompts.map((prompt, index) => (
          <motion.li
            layout
            key={prompt?.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
          >
            <PromptCard prompt={prompt} />
          </motion.li>
        ))}
      </motion.ul>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" />}
      {isLoadingMore &&
        [1, 2, 3].map((item) => <Skeleton key={item} className="h-9" />)}
    </>
  );
}
