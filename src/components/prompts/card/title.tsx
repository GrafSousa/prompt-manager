import { Typography } from '@/components/ui/typography';

interface TitleProps {
  title: string;
}

export function PromptCardTitle({ title }: TitleProps) {
  return (
    <Typography variant="body-sm" className="text-white">
      {title}
    </Typography>
  );
}
