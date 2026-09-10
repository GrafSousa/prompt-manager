'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

import { PromptCard } from '../card';
import { useSearchPrompts } from '@/presentation/prompts/hooks/use-search-prompt';

export function PromptList() {
  const { prompts, hasMore, isLoadingMore, loadMore } = useSearchPrompts();

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

  return (
    <motion.ul layout className="space-y-5">
      {prompts.map((prompt, index) => (
        <motion.li
          layout
          key={prompt.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.04 }}
        >
          <PromptCard prompt={prompt} />
        </motion.li>
      ))}
      {hasMore && <div ref={sentinelRef} />}
      {isLoadingMore && <p>Loading prompts...</p>}
    </motion.ul>
  );
}
