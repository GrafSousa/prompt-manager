'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, ArrowLeftToLine, ArrowRightToLine, Plus } from 'lucide-react';

import { useSidebar } from './root';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Typography } from '../ui/typography';
import { debounce } from '@/presentation/utils/debounce';
import { useSearchPrompts } from '@/presentation/prompts/hooks/use-search-prompts';
import { useRouter } from 'next/navigation';

interface SidebarContentProps {
  children: React.ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  const router = useRouter();
  const { q, setQ } = useSearchPrompts();

  const { toggle, isCollapsed } = useSidebar();
  const [searchValue, setSearchValue] = useState(q);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setQ(text);
      }, 500),
    [setQ]
  );

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event?.target.value;

    setSearchValue(value);
    debouncedSearch(value);
  }

  function handleNewPrompt() {
    router.push('/prompts/new');
  }

  return (
    <>
      {isCollapsed ? (
        <>
          <header className="flex flex-row justify-between items-center mb-12">
            <Link href="/" aria-label="Prompt manager home">
              <Image alt="" width={109} height={24} src="/logo.svg" />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label="Collapse sidebar"
            >
              <ArrowLeftToLine aria-hidden={true} />
            </Button>
          </header>

          <div className="space-y-5 md:">
            <Input.Root>
              <Input.Content>
                <Input.Prefix>
                  <Search strokeWidth={1} size={14} />
                </Input.Prefix>
                <Input.Control
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchInputChange}
                />
              </Input.Content>
            </Input.Root>

            <Button onClick={handleNewPrompt}>
              <Typography variant="body-sm">New prompt</Typography>
            </Button>

            {children}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-12">
          <header>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label="Collapse sidebar"
            >
              <ArrowRightToLine aria-hidden={true} />
            </Button>
          </header>

          <Button size="icon">
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}
