'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Search,
  ArrowLeftToLine,
  ArrowRightToLine,
  Plus,
  Menu,
} from 'lucide-react';

import { useSidebar } from './root';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Typography } from '../ui/typography';
import { debounce } from '@/presentation/utils/debounce';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/presentation/prompts/hooks/use-search-prompts';
import { Box } from '../ui/box';
import { twMerge } from 'tailwind-merge';

interface SidebarContentProps {
  children: React.ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  const router = useRouter();
  const { q, setQ } = useSearch();

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
      <header
        className={twMerge(
          'flex p-1 mb-4 flex-row items-center justify-between',
          `md:flex-row md:justify-between md:items-center md:mb-12`
        )}
      >
        <Link
          href="/"
          aria-label="Prompt manager home"
          className={`md:${isCollapsed ? 'block' : 'hidden'}`}
        >
          <Image alt="" width={88} height={1} src="/logo.svg" />
        </Link>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggle}
          aria-label="Collapse sidebar"
        >
          <Menu className="md:hidden" aria-hidden={true} />
          <ArrowLeftToLine
            className={`hidden md:${isCollapsed ? 'block' : 'hidden'}`}
            aria-hidden={true}
          />
          <ArrowRightToLine
            className={`hidden md:${!isCollapsed ? 'block' : 'hidden'}`}
            aria-hidden={true}
          />
        </Button>
      </header>

      {isCollapsed ? (
        <Box className="flex min-h-0 flex-1 flex-col gap-5">
          <label className="sr-only" htmlFor="search-prompt">
            Search
          </label>

          <Input.Root>
            <Input.Content>
              <Input.Prefix>
                <Search strokeWidth={1} size={14} />
              </Input.Prefix>
              <Input.Control
                id="search-prompt"
                aria-label="Search"
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
        </Box>
      ) : (
        <Button
          size="icon"
          className={`hidden md:${!isCollapsed ? 'flex' : 'hidden'}`}
          onClick={handleNewPrompt}
        >
          <Plus width={24} />
        </Button>
      )}
    </>
  );
}
