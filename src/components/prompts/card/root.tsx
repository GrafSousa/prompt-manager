import { twMerge } from 'tailwind-merge';

export function PromptCardRoot(props: React.ComponentProps<'div'>) {
  return (
    <div
      className={twMerge(
        'flex justify-between items-center gap-3 p-2 rounded-sm',
        'hover:bg-gray-200'
      )}
      {...props}
    />
  );
}
