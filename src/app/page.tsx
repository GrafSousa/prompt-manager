import { Typography } from '@/components/ui/typography';

export default async function Home() {
  return (
    <section className="flex min-h-full mt-30">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Typography as="h1" variant="heading-xl" className="mb-4">
            Select prompt
          </Typography>
          <Typography as="p" variant="body-md">
            Choose a prompt from the list to view and edit.
          </Typography>
        </div>
      </div>
    </section>
  );
}
