import '@/styles/globals.css';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { PromptSidebar } from '@/components/prompts/sidebar';

import { Providers } from './providers';
import { twMerge } from 'tailwind-merge';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Gerencie seus prompts',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <div
            className={twMerge(
              'min-h-screen bg-background text-white',
              'flex flex-col',
              'md:grid md:grid-cols-app'
            )}
          >
            <PromptSidebar />
            <main className="flex-1 md:col-start-2">{children}</main>
          </div>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
