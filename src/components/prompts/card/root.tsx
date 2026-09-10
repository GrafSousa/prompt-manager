import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface PromptCardRootProps {
  id: string;
  children: React.ReactNode;
}

export function PromptCardRoot({ id, children }: PromptCardRootProps) {
  return (
    <Link
      href={`/prompts/${id}/edit`}
      className={twMerge(
        'flex justify-between items-center gap-3 p-2 rounded-sm',
        'cursor-pointer hover:bg-gray-200'
      )}
    >
      {children}
    </Link>
  );
}
