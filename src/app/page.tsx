import { Typography } from '@/components/ui/typography';

export default async function Home() {
  return (
    <section className="flex min-h-full">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Typography as="h1" variant="heading-xl" className="mb-4">
            Selecione um prompt
          </Typography>
          <Typography as="p" variant="body-md">
            Escolha um prompt da lista ao lado para visualizar e editar
          </Typography>
        </div>
      </div>
    </section>
  );
}
