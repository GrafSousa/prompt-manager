import { Typography } from '@/components/ui/typography';

interface ContentProps {
  content: string;
}

export function PromptCardContent({ content }: ContentProps) {
  return (
    <Typography variant="body-xs" className="text-gray-100 block truncate">
      {content}
    </Typography>
  );
}
